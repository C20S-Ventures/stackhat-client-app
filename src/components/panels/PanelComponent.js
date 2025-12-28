import PropTypes from 'prop-types'

function PanelComponent({ children }) {
  return <div className="panel-component">{children}</div>
}

PanelComponent.propTypes = {
  children: PropTypes.node,
}

PanelComponent.defaultProps = {
  children: undefined,
}

export default PanelComponent
