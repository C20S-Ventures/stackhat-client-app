import { useLocation, useNavigate, useParams } from 'react-router-dom'

// React Router v6 removed withRouter. This shim gives class components the
// v5-style props they still rely on (match.params, location, navigate).
const withRouter = (Component) => {
  const WithRouter = (props) => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    return <Component {...props} match={{ params }} location={location} navigate={navigate} />
  }
  WithRouter.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`
  return WithRouter
}

export default withRouter
