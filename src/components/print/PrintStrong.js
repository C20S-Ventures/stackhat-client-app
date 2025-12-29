import PropTypes from 'prop-types'

function PrintStrong({ children }) {
  return <strong className="pr block">{children}</strong>
}

PrintStrong.propTypes = {
  children: PropTypes.node,
}

PrintStrong.defaultProps = {
  children: undefined,
}

export default PrintStrong
