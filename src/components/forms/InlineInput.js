import PropTypes from 'prop-types'
import { RIEInput } from 'riek'

function InlineInput(props) {
  return (
    <span className="inline-editable-wrapper" title="Edit">
      <RIEInput {...props} className="inline-editable" classEditing="form-control" />
    </span>
  )
}

InlineInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
  validate: PropTypes.func,
  classLoading: PropTypes.string,
  classInvalid: PropTypes.string,
}

export default InlineInput
