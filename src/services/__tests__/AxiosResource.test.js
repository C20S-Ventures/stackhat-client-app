import AxiosResource from '../AxiosResource'
import Axios from 'axios'

// Mock Axios
jest.mock('axios')

// Mock AuthenticationStore
jest.mock('../../stores/AuthenticationStore', () => ({
  __esModule: true,
  default: {
    Principal: {
      token: 'test-token-123',
    },
  },
}))

describe('AxiosResource', () => {
  let resource

  beforeEach(() => {
    jest.clearAllMocks()
    resource = new AxiosResource({
      url: '/api/items',
      idName: 'id',
      params: { tenant: 'test' },
    })
  })

  describe('constructor', () => {
    it('creates resource with config', () => {
      expect(resource.config.url).toBe('/api/items')
      expect(resource.config.idName).toBe('id')
      expect(resource.config.params).toEqual({ tenant: 'test' })
    })

    it('uses default config values', () => {
      const defaultResource = new AxiosResource({ url: '/api/test' })
      expect(defaultResource.config.writeStripArrayAndCommonProps).toBe(true)
    })
  })

  describe('getHeaders', () => {
    it('returns authorization header with bearer token', () => {
      const headers = resource.getHeaders()
      expect(headers).toEqual({ Authorization: 'Bearer test-token-123' })
    })
  })

  describe('getParams', () => {
    it('merges config params with provided params', () => {
      const params = resource.getParams({ page: 1 })
      expect(params).toEqual({ tenant: 'test', page: 1 })
    })

    it('returns config params when no params provided', () => {
      const params = resource.getParams()
      expect(params).toEqual({ tenant: 'test' })
    })
  })

  describe('get', () => {
    it('fetches single item by id', async () => {
      const mockData = { id: 1, name: 'Test Item' }
      Axios.get.mockResolvedValueOnce({ data: mockData })

      const result = await resource.get(1)

      expect(Axios.get).toHaveBeenCalledWith('/api/items/1', expect.objectContaining({
        headers: { Authorization: 'Bearer test-token-123' },
      }))
      expect(result).toEqual(mockData)
    })

    it('fetches all items when no id provided', async () => {
      const mockData = [{ id: 1 }, { id: 2 }]
      Axios.get.mockResolvedValueOnce({ data: mockData })

      const result = await resource.get()

      expect(Axios.get).toHaveBeenCalledWith('/api/items', expect.objectContaining({
        headers: { Authorization: 'Bearer test-token-123' },
      }))
      expect(result).toEqual(mockData)
    })
  })

  describe('create', () => {
    it('posts new item data', async () => {
      const newItem = { name: 'New Item' }
      const createdItem = { id: 1, name: 'New Item' }
      Axios.post.mockResolvedValueOnce({ data: createdItem })

      const result = await resource.create(newItem)

      expect(Axios.post).toHaveBeenCalledWith('/api/items', newItem, expect.objectContaining({
        headers: { Authorization: 'Bearer test-token-123' },
      }))
      expect(result).toEqual(createdItem)
    })
  })

  describe('update', () => {
    it('puts updated item data', async () => {
      const updatedItem = { id: 1, name: 'Updated Item' }
      Axios.put.mockResolvedValueOnce({ data: updatedItem })

      const result = await resource.update(updatedItem, 1)

      expect(Axios.put).toHaveBeenCalledWith('/api/items/1', updatedItem, expect.objectContaining({
        headers: { Authorization: 'Bearer test-token-123' },
      }))
      expect(result).toEqual(updatedItem)
    })
  })

  describe('patch', () => {
    it('patches item with partial data', async () => {
      const patchData = { name: 'Patched Name' }
      const patchedItem = { id: 1, name: 'Patched Name' }
      Axios.patch.mockResolvedValueOnce({ data: patchedItem })

      const result = await resource.patch(patchData, 1)

      expect(Axios.patch).toHaveBeenCalledWith('/api/items/1', patchData, expect.objectContaining({
        headers: { Authorization: 'Bearer test-token-123' },
      }))
      expect(result).toEqual(patchedItem)
    })
  })

  describe('delete', () => {
    it('deletes item by id', async () => {
      Axios.delete.mockResolvedValueOnce({ status: 204 })

      await resource.delete(1)

      expect(Axios.delete).toHaveBeenCalledWith('/api/items/1', expect.objectContaining({
        headers: { Authorization: 'Bearer test-token-123' },
      }))
    })
  })

  describe('query', () => {
    it('queries items with params', async () => {
      const mockData = [{ id: 1 }, { id: 2 }]
      Axios.get.mockResolvedValueOnce({ data: mockData })

      const result = await resource.query(null, { status: 'active' })

      expect(Axios.get).toHaveBeenCalledWith('/api/items', expect.objectContaining({
        params: { tenant: 'test', status: 'active' },
      }))
      expect(result).toEqual(mockData)
    })
  })

  describe('list', () => {
    it('handles paginated response with Items property', async () => {
      const mockResponse = { Items: [{ id: 1 }, { id: 2 }], Total: 10 }
      Axios.get.mockResolvedValueOnce({ data: mockResponse })

      const result = await resource.list(null, { page: 1 })

      expect(result).toHaveLength(2)
      expect(result.$_total).toBe(10)
    })
  })

  describe('convertDates', () => {
    it('converts ISO date strings to Date objects', () => {
      const obj = {
        createdAt: '2024-01-15T10:30:00Z',
        name: 'Test',
        nested: {
          updatedAt: '2024-02-20T15:45:00.000Z',
        },
      }

      resource.convertDates(obj)

      expect(obj.createdAt).toBeInstanceOf(Date)
      expect(obj.name).toBe('Test')
      expect(obj.nested.updatedAt).toBeInstanceOf(Date)
    })

    it('leaves non-date strings unchanged', () => {
      const obj = { name: 'Not a date', code: '2024-TEST' }

      resource.convertDates(obj)

      expect(obj.name).toBe('Not a date')
      expect(obj.code).toBe('2024-TEST')
    })
  })

  describe('transformWriteRequest', () => {
    it('strips array properties from data', () => {
      const data = {
        id: 1,
        name: 'Test',
        items: [1, 2, 3],
        tags: ['a', 'b'],
      }

      const result = resource.transformWriteRequest(data, {})

      expect(result.id).toBe(1)
      expect(result.name).toBe('Test')
      expect(result.items).toBeUndefined()
      expect(result.tags).toBeUndefined()
    })

    it('strips common properties', () => {
      const data = {
        id: 1,
        name: 'Test',
        UserInfo: { name: 'User' },
        IsInactive: false,
      }

      const result = resource.transformWriteRequest(data, {})

      expect(result.id).toBe(1)
      expect(result.name).toBe('Test')
      expect(result.UserInfo).toBeUndefined()
      expect(result.IsInactive).toBeUndefined()
    })
  })

  describe('log', () => {
    const originalEnv = process.env.NODE_ENV

    afterEach(() => {
      process.env.NODE_ENV = originalEnv
    })

    it('logs in development mode', () => {
      process.env.NODE_ENV = 'development'
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      resource.log('GET', '/api/items')

      expect(consoleSpy).toHaveBeenCalledWith('[RES]', 'GET', '/api/items')
      consoleSpy.mockRestore()
    })

    it('does not log in production mode', () => {
      process.env.NODE_ENV = 'production'
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      resource.log('GET', '/api/items')

      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })
})
