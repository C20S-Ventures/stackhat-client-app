import PropTypes from 'prop-types'

function PanelHeadingFunctions({ children }) {
  return <div className="panel-heading__functions">{children}</div>
}

PanelHeadingFunctions.propTypes = {
  children: PropTypes.node,
}

PanelHeadingFunctions.defaultProps = {
  children: undefined,
}

export default PanelHeadingFunctions
