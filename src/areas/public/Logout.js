import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'
import { Navigate } from 'react-router-dom'

const Logout = ({ Authentication }) => {
  useEffect(() => {
    Authentication.SignOut(() => {
      history.pushState({}, null, "/")
    })
  }, [Authentication])

  return <Navigate to="/" replace />
}

Logout.propTypes = {
  Authentication: PropTypes.shape({
    SignOut: PropTypes.func.isRequired,
  }).isRequired,
}

export default inject("Authentication")(Logout)
