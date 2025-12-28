import PropTypes from 'prop-types'
import { Button, NavItem } from 'react-bootstrap'
import Icon from 'react-fontawesome'

function NavButtonItem({ text, icon, iconSize, title, onClick, className }) {
  const iconItem = icon ? <Icon name={icon} size={iconSize || 'lg'} /> : null

  return (
    <Button
      componentClass={NavItem}
      bsStyle="link"
      className={className}
      title={title}
      onClick={onClick}
    >
      {iconItem} {text}
    </Button>
  )
}

NavButtonItem.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

NavButtonItem.defaultProps = {
  text: undefined,
  icon: undefined,
  iconSize: 'lg',
  title: undefined,
  onClick: undefined,
  className: undefined,
}

export default NavButtonItem
