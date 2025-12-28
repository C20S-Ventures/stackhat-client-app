import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Version from '../services/Version'

const Footer = ({ Authentication }) => {
  if (Authentication.IsAuthenticated) {
    return (
      <footer className="text-center" role="contentinfo">
        &copy; StackHat
        <span className="version">v{Version}</span>
      </footer>
    )
  }

  return (
    <span className="version login">v{Version}</span>
  )
}

Footer.propTypes = {
  Authentication: PropTypes.shape({
    IsAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
}

export default inject("Authentication")(observer(Footer))
