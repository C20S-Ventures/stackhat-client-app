import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Panel } from 'react-bootstrap'

function PanelLink({ to, active, className, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `panel-link ${active || isActive ? 'active' : ''} ${className || ''}`
      }
    >
      <Panel>
        <Panel.Body>{children}</Panel.Body>
      </Panel>
    </NavLink>
  )
}

PanelLink.propTypes = {
  to: PropTypes.string.isRequired,
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

PanelLink.defaultProps = {
  active: false,
  className: undefined,
  children: undefined,
}

export default PanelLink
