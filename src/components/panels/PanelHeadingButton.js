import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import Icon from 'react-fontawesome'

function PanelHeadingButton({ title, icon, onClick, customClass }) {
  const handleClick = (event) => {
    event.stopPropagation()
    if (onClick) onClick(event)
  }

  return (
    <Button bsStyle="link" bsSize="xsmall" title={title} onClick={handleClick} className={customClass}>
      <Icon name={icon} />
    </Button>
  )
}

PanelHeadingButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  customClass: PropTypes.string,
}

PanelHeadingButton.defaultProps = {
  title: undefined,
  onClick: undefined,
  customClass: undefined,
}

export default PanelHeadingButton
