import { useEffect, useRef, useCallback } from 'react'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { useIdleTimer } from 'react-idle-timer'
import Config from 'react-global-configuration'

import LoadingBar from '../components/LoadingBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PrivateRoute from '../components/routing/PrivateRoute'
import PrintFrame from '../components/print/PrintFrame'

import Login from './public/Login'
import Dashboard from './dashboard'
import Account from './account'
import Logout from './public/Logout'
import Password from './public/Password'
import { ErrorBoundary } from '../components/errors'
import Theme from '../components/Theme'
import Api from '../services/Api'
import Notify from '../services/Notify'

const ConfigAuth = Config.get("auth")

const Master = ({ Authentication }) => {
  const versionCheckTimer = useRef(null)

  const handleIdle = useCallback(() => {
    Authentication.RedirectLogin("idle")
  }, [Authentication])

  const handleVersionCheck = useCallback(() => {
    Api.Authentication.versionCheck()
      .then(newVersionAvailable => {
        if (newVersionAvailable) {
          Notify.newVersionReload()
        } else {
          versionCheckTimer.current = setTimeout(handleVersionCheck, ConfigAuth.versionCheck.intervalMs)
        }
      })
  }, [])

  useEffect(() => {
    if (ConfigAuth.versionCheck.enabled) {
      versionCheckTimer.current = setTimeout(handleVersionCheck, ConfigAuth.versionCheck.intervalMs)
    }
    return () => {
      if (versionCheckTimer.current) {
        clearTimeout(versionCheckTimer.current)
      }
    }
  }, [handleVersionCheck])

  useIdleTimer({
    timeout: ConfigAuth.idleTimeoutMs,
    onIdle: handleIdle,
    disabled: !Authentication.IsAuthenticated,
  })

  const isAuth = Authentication.IsAuthenticated
  document.body.className = isAuth ? "" : "public"

  return (
    <div className="master">
      <LoadingBar />
      <Theme />
      <Header />
      <main className="main container-fluid" role="main">
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/password' element={<Password />} />
            <Route path='/dashboard/*' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path='/account/*' element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            } />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      <ToastContainer autoClose={8000} position={'bottom-left'} />
      <PrintFrame />
    </div>
  )
}

export default inject("Authentication")(observer(Master))
