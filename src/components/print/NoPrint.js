import PropTypes from 'prop-types'

function NoPrint({ children }) {
  return <span className="nopr">{children}</span>
}

NoPrint.propTypes = {
  children: PropTypes.node,
}

NoPrint.defaultProps = {
  children: undefined,
}

export default NoPrint
