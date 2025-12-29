import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap'
import FieldRequiredIndicator from './FieldRequiredIndicator'

function NumberInput({ field }) {
  return (
    <FormGroup>
      {field.label && (
        <ControlLabel>
          {field.label} <FieldRequiredIndicator field={field} />
        </ControlLabel>
      )}
      <FormControl type="number" {...field.bind()} {...field.extra} />
      {field.error && <span className="validation-error">{field.error}</span>}
    </FormGroup>
  )
}

NumberInput.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    error: PropTypes.string,
    extra: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      step: PropTypes.number,
    }),
    bind: PropTypes.func.isRequired,
  }).isRequired,
}

export default observer(NumberInput)
