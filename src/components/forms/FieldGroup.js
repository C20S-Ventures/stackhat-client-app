import PropTypes from 'prop-types'
import { ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'
import FieldRequiredIndicator from './FieldRequiredIndicator'

function FieldGroup({ id, label, help, field, value, ...props }) {
  const errorId = field?.error ? `${id}-error` : undefined

  return (
    <FormGroup controlId={id} validationState={field?.error ? 'error' : null}>
      {label && (
        <ControlLabel>
          {label} <FieldRequiredIndicator field={field} />
        </ControlLabel>
      )}
      <FormControl
        value={value}
        aria-describedby={errorId}
        aria-invalid={!!field?.error}
        {...props}
      />
      {field?.error && (
        <p id={errorId} className="error" role="alert">
          {field.error}
        </p>
      )}
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.string,
  field: PropTypes.shape({
    error: PropTypes.string,
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

FieldGroup.defaultProps = {
  id: undefined,
  label: undefined,
  help: undefined,
  field: undefined,
  value: '',
}

export default FieldGroup
