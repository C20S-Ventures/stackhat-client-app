import PropTypes from 'prop-types'
import { Nav, Panel } from 'react-bootstrap'

function SubNav({ mode, children }) {
  const displayMode = mode || 'vertical'

  return (
    <div className={`subnav subnav-${displayMode}`}>
      <Panel>
        <Nav bsStyle="pills" stacked={displayMode === 'vertical'}>
          {children}
        </Nav>
      </Panel>
    </div>
  )
}

SubNav.propTypes = {
  mode: PropTypes.oneOf(['vertical', 'horizontal']),
  children: PropTypes.node,
}

SubNav.defaultProps = {
  mode: 'vertical',
  children: undefined,
}

export default SubNav
