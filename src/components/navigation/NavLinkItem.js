import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

function NavLinkItem({ to, text, external, icon, iconSize, title, isActive }) {
  const iconItem = icon ? <FontAwesome name={icon} size={iconSize || "lg"} /> : null

  if (external) {
    return (
      <li className="navlink">
        <a
          href={to}
          title={title}
          target="_blank"
          rel="noopener noreferrer"
        >
          {iconItem} {text}
        </a>
      </li>
    )
  }

  return (
    <li className="navlink">
      <NavLink
        to={to}
        title={title}
        className={({ isActive: routerActive }) =>
          (isActive !== undefined ? isActive : routerActive) ? 'active' : ''
        }
      >
        {iconItem} {text}
      </NavLink>
    </li>
  )
}

NavLinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  external: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  title: PropTypes.string,
  isActive: PropTypes.bool,
}

NavLinkItem.defaultProps = {
  text: '',
  external: false,
  icon: undefined,
  iconSize: 'lg',
  title: undefined,
  isActive: undefined,
}

export default NavLinkItem
