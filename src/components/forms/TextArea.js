import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap'
import FieldRequiredIndicator from './FieldRequiredIndicator'

function TextArea({ field, rows }) {
  return (
    <FormGroup>
      {field.label && (
        <ControlLabel>
          {field.label} <FieldRequiredIndicator field={field} />
        </ControlLabel>
      )}
      <FormControl componentClass="textarea" {...field.bind()} rows={rows} />
      {field.error && <span className="validation-error">{field.error}</span>}
    </FormGroup>
  )
}

TextArea.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    error: PropTypes.string,
    bind: PropTypes.func.isRequired,
  }).isRequired,
  rows: PropTypes.number,
}

TextArea.defaultProps = {
  rows: 4,
}

export default observer(TextArea)
