import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthenticationStore from '../../stores/AuthenticationStore'

const PrivateRoute = ({ children }) => {
  const location = useLocation()

  if (!AuthenticationStore.IsAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export default PrivateRoute
