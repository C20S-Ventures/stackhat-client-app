import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from 'react-fontawesome'

function LinkButton({ to, text, icon, iconSize, title }) {
  return (
    <Link to={to} title={title}>
      {icon && <Icon name={icon} size={iconSize || null} />} {text}
    </Link>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  title: PropTypes.string,
}

LinkButton.defaultProps = {
  text: undefined,
  icon: undefined,
  iconSize: undefined,
  title: undefined,
}

export default LinkButton
