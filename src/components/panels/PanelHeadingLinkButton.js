import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from './PanelHeadingButton'

function PanelHeadingLinkButton({ to, title, icon, customClass }) {
  return (
    <Link to={to}>
      <Button title={title} icon={icon} customClass={customClass} />
    </Link>
  )
}

PanelHeadingLinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string.isRequired,
  customClass: PropTypes.string,
}

PanelHeadingLinkButton.defaultProps = {
  title: undefined,
  customClass: undefined,
}

export default PanelHeadingLinkButton
