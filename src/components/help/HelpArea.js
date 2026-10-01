import PropTypes from 'prop-types'

function HelpArea({ children }) {
  return <div className="help-area">{children}</div>
}

HelpArea.propTypes = {
  children: PropTypes.node,
}

HelpArea.defaultProps = {
  children: undefined,
}

export default HelpArea
