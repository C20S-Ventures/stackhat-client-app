import { runInAction } from 'mobx'

// Mock the Api module
jest.mock('../../services/Api', () => ({
  Authentication: {
    login: jest.fn(),
    forgotPassword: jest.fn(),
  },
  ClientSettings: {
    get: jest.fn(),
  },
}))

const settingsResponse = { data: { org: {}, user: {}, help: {} } }

// Mock local-storage
jest.mock('local-storage', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}))

describe('AuthenticationStore', () => {
  let AuthenticationStore
  let LocalStorage
  let Api

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()

    // Reset modules to get a fresh store instance
    jest.resetModules()

    // Re-import the mocks alongside the store so they share the same module registry
    LocalStorage = require('local-storage')
    Api = require('../../services/Api')
    AuthenticationStore = require('../AuthenticationStore').default
  })

  describe('Initial State', () => {
    it('should have IsAuthenticated as false initially', () => {
      expect(AuthenticationStore.IsAuthenticated).toBe(false)
    })

    it('should have empty Principal initially', () => {
      expect(AuthenticationStore.Principal.token).toBe('')
      expect(AuthenticationStore.Principal.userName).toBe('')
      expect(AuthenticationStore.Principal.roles).toEqual([])
    })
  })

  describe('Initialise', () => {
    it('should resolve immediately if no stored data', async () => {
      LocalStorage.get.mockReturnValue(null)

      await AuthenticationStore.Initialise()

      expect(AuthenticationStore.IsAuthenticated).toBe(false)
    })

    it('should set IsAuthenticated true if valid stored data exists', async () => {
      const storedData = {
        isAuth: true,
        token: 'test-token',
        userName: 'test@test.com',
        userId: '123',
        firstName: 'Test',
        lastName: 'User',
        roles: ['user'],
      }
      LocalStorage.get.mockReturnValue(storedData)

      // Settings.Load succeeds
      Api.ClientSettings.get.mockResolvedValue(settingsResponse)

      await AuthenticationStore.Initialise()

      expect(AuthenticationStore.IsAuthenticated).toBe(true)
      expect(AuthenticationStore.Principal.token).toBe('test-token')
    })

    it('should sign out if Settings.Load fails', async () => {
      const storedData = {
        isAuth: true,
        token: 'test-token',
      }
      LocalStorage.get.mockReturnValue(storedData)

      // Settings.Load fails
      Api.ClientSettings.get.mockRejectedValue(new Error('Failed'))

      await AuthenticationStore.Initialise()

      expect(AuthenticationStore.IsAuthenticated).toBe(false)
    })
  })

  describe('IsInRole', () => {
    it('should return true if user has the role', () => {
      runInAction(() => {
        AuthenticationStore.Principal = {
          ...AuthenticationStore.Principal,
          roles: ['admin', 'user'],
        }
      })

      expect(AuthenticationStore.IsInRole('admin')).toBe(true)
      expect(AuthenticationStore.IsInRole('ADMIN')).toBe(true) // case insensitive
    })

    it('should return false if user does not have the role', () => {
      runInAction(() => {
        AuthenticationStore.Principal = {
          ...AuthenticationStore.Principal,
          roles: ['user'],
        }
      })

      expect(AuthenticationStore.IsInRole('admin')).toBe(false)
    })
  })

  describe('IsUser', () => {
    it('should return true if id matches current user', () => {
      runInAction(() => {
        AuthenticationStore.Principal = {
          ...AuthenticationStore.Principal,
          userId: '123',
        }
      })

      expect(AuthenticationStore.IsUser('123')).toBe(true)
    })

    it('should return false if id does not match', () => {
      runInAction(() => {
        AuthenticationStore.Principal = {
          ...AuthenticationStore.Principal,
          userId: '123',
        }
      })

      expect(AuthenticationStore.IsUser('456')).toBe(false)
    })

    it('should return false if id is null', () => {
      expect(AuthenticationStore.IsUser(null)).toBe(false)
    })
  })

  describe('SignOut', () => {
    it('should clear local storage', () => {
      AuthenticationStore.SignOut()

      expect(LocalStorage.remove).toHaveBeenCalledWith('PrincipalData')
    })

    it('should reset IsAuthenticated to false', () => {
      runInAction(() => {
        AuthenticationStore.IsAuthenticated = true
      })

      AuthenticationStore.SignOut()

      expect(AuthenticationStore.IsAuthenticated).toBe(false)
    })

    it('should reset Principal', () => {
      runInAction(() => {
        AuthenticationStore.Principal = {
          token: 'test-token',
          userName: 'test@test.com',
        }
      })

      AuthenticationStore.SignOut()

      expect(AuthenticationStore.Principal.token).toBe('')
    })

    it('should call callback if provided', (done) => {
      AuthenticationStore.SignOut(() => {
        expect(true).toBe(true)
        done()
      })
    })
  })

  describe('Authenticate', () => {
    it('should call Api.Authentication.login with correct params', async () => {
      Api.Authentication.login.mockResolvedValue({
        data: {
          access_token: 'new-token',
          userId: '123',
          firstName: 'Test',
          lastName: 'User',
          roles: 'user',
          license: '{}',
        },
      })

      Api.ClientSettings.get.mockResolvedValue(settingsResponse)

      const credentials = { userName: 'test@test.com', password: 'password' }

      await AuthenticationStore.Authenticate({
        type: 'password',
        credentials,
        success: jest.fn(),
        error: jest.fn(),
      })

      expect(Api.Authentication.login).toHaveBeenCalledWith('password', credentials)
    })

    it('should set Principal on successful login', async () => {
      Api.Authentication.login.mockResolvedValue({
        data: {
          access_token: 'new-token',
          userId: '123',
          firstName: 'Test',
          lastName: 'User',
          roles: 'user,admin',
          license: '{}',
        },
      })

      Api.ClientSettings.get.mockResolvedValue(settingsResponse)

      await new Promise((resolve) => {
        AuthenticationStore.Authenticate({
          type: 'password',
          credentials: { userName: 'test@test.com', password: 'password' },
          success: resolve,
          error: jest.fn(),
        })
      })

      expect(AuthenticationStore.Principal.token).toBe('new-token')
      expect(AuthenticationStore.Principal.roles).toContain('user')
      expect(AuthenticationStore.Principal.roles).toContain('admin')
    })

    it('should sign out on login failure', async () => {
      Api.Authentication.login.mockRejectedValue({
        response: { data: 'Invalid credentials' },
      })

      const errorCallback = jest.fn()

      await AuthenticationStore.Authenticate({
        type: 'password',
        credentials: { userName: 'test@test.com', password: 'wrong' },
        success: jest.fn(),
        error: errorCallback,
      })

      // Wait for setTimeout
      await new Promise((resolve) => setTimeout(resolve, 10))

      expect(AuthenticationStore.IsAuthenticated).toBe(false)
    })
  })

  describe('ForgotPassword', () => {
    it('should call Api.Authentication.forgotPassword', () => {
      Api.Authentication.forgotPassword.mockResolvedValue({})

      AuthenticationStore.ForgotPassword('test@test.com')

      expect(Api.Authentication.forgotPassword).toHaveBeenCalledWith('test@test.com')
    })
  })
})
