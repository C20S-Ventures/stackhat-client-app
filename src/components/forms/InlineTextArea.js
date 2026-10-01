import PropTypes from 'prop-types'
import { RIETextArea } from 'riek'

function InlineTextArea({ value, ...props }) {
  return (
    <span className="inline-editable-wrapper" title="Edit">
      <RIETextArea
        value={String(value)}
        {...props}
        className="inline-editable"
        classEditing="form-control"
      />
    </span>
  )
}

InlineTextArea.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  change: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
  validate: PropTypes.func,
  classLoading: PropTypes.string,
  classInvalid: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
}

InlineTextArea.defaultProps = {
  value: '',
  rows: undefined,
  cols: undefined,
}

export default InlineTextArea
