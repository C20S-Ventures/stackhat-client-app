import { useState, useEffect } from 'react'
import { Navigate, Link, useLocation } from 'react-router-dom'
import { Button, Alert, Panel } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import Notify from '../../services/Notify'
import FieldGroup from '../../components/forms/FieldGroup'
import LoginLogo from './LoginLogo'
import LoadingSpinner from '../../components/LoadingSpinner'

function Login({ Authentication, Settings, Stores }) {
  const location = useLocation()
  const [mode, setMode] = useState('normal')
  const [ssoState, setSsoState] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Reset stores
    Stores.Reset()

    const qs = QueryString.parse(location.search)
    const hash = QueryString.parse(location.hash)

    // Sign out on unauth
    if (qs.reason === 'unauth' || qs.reason === 'idle') {
      Authentication.SignOut()
      setMessage(qs.reason === 'idle' ? 'Your session has expired' : 'Authentication is required.')
    }

    // SSO
    if (qs.mode === 'sso') {
      setMode('sso')
      setSsoState('init')
    } else if (hash.id_token) {
      setMode('sso')
      setSsoState('authed')
      loginSSO(hash.id_token)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = (event) => {
    event.preventDefault()

    Authentication.Authenticate({
      type: 'password',
      credentials: { userName, password },
      success: () => {
        document.body.className = ''
      },
      error: (error) => {
        Notify.error(error?.error_description || 'Login failed')
      },
    })
  }

  const loginSSO = (id_token) => {
    Authentication.Authenticate({
      type: 'id_token',
      credentials: { id_token },
      success: () => {
        document.body.className = ''
      },
      error: (error) => {
        setSsoState('error')
        setMessage(error?.error_description || error?.toString() || 'SSO login failed')
      },
    })
  }

  // Redirect if authenticated
  if (Authentication.IsAuthenticated) {
    const redirectTo = Settings.user?.start_module || '/dashboard'
    return <Navigate to={redirectTo} replace />
  }

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={handleLogin}>
        <LoginLogo />

        {mode !== 'sso' && (
          <div>
            {message && (
              <Alert bsStyle="warning" role="alert">
                {message}
              </Alert>
            )}

            <Panel>
              <Panel.Body>
                <p>Please sign in</p>

                <FieldGroup
                  type="email"
                  placeholder="Enter email"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  autoComplete="email"
                  aria-label="Email address"
                />
                <FieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  aria-label="Password"
                />

                <Button type="submit" bsStyle="primary" block>
                  Sign in
                </Button>
              </Panel.Body>
            </Panel>

            <Link to="/password">Forgot password?</Link>
          </div>
        )}

        {mode === 'sso' && (
          <div>
            <Panel>
              <Panel.Body>
                {ssoState === 'init' && <p>Redirecting you to sign in provider...</p>}
                {ssoState === 'authed' && <p>Signing you in, please wait...</p>}
                {ssoState === 'error' && (
                  <div role="alert">
                    <p>An error occurred, please contact support.</p>
                    {message && (
                      <p>
                        <strong>Error:</strong> {message}
                      </p>
                    )}
                  </div>
                )}
                {ssoState !== 'error' && <LoadingSpinner />}
              </Panel.Body>
            </Panel>
          </div>
        )}
      </form>
    </div>
  )
}

Login.propTypes = {
  Authentication: PropTypes.shape({
    IsAuthenticated: PropTypes.bool.isRequired,
    Authenticate: PropTypes.func.isRequired,
    SignOut: PropTypes.func.isRequired,
  }).isRequired,
  Settings: PropTypes.shape({
    user: PropTypes.shape({
      start_module: PropTypes.string,
    }),
  }).isRequired,
  Stores: PropTypes.shape({
    Reset: PropTypes.func.isRequired,
  }).isRequired,
}

export default inject('Settings', 'Authentication', 'Stores')(observer(Login))
