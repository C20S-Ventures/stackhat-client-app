import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap'
import FieldRequiredIndicator from './FieldRequiredIndicator'

function Input({ field }) {
  return (
    <FormGroup>
      {field.label && (
        <ControlLabel>
          {field.label} <FieldRequiredIndicator field={field} />
        </ControlLabel>
      )}
      <FormControl {...field.bind()} />
      {field.error && <span className="validation-error">{field.error}</span>}
      {field.extra?.description && (
        <span className="field-description">{field.extra.description}</span>
      )}
    </FormGroup>
  )
}

Input.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    error: PropTypes.string,
    extra: PropTypes.shape({
      description: PropTypes.string,
    }),
    bind: PropTypes.func.isRequired,
  }).isRequired,
}

export default observer(Input)
