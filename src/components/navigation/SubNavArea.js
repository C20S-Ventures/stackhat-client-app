import PropTypes from 'prop-types'

function SubNavArea({ children }) {
  return <div className="subnav-area pull-left">{children}</div>
}

SubNavArea.propTypes = {
  children: PropTypes.node,
}

SubNavArea.defaultProps = {
  children: undefined,
}

export default SubNavArea
