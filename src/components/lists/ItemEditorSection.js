import PropTypes from 'prop-types'

function ItemEditorSection({ children }) {
  return <div className="item-editor-section">{children}</div>
}

ItemEditorSection.propTypes = {
  children: PropTypes.node,
}

ItemEditorSection.defaultProps = {
  children: undefined,
}

export default ItemEditorSection
