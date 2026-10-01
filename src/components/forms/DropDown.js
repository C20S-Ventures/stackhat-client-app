import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap'
import FieldRequiredIndicator from './FieldRequiredIndicator'

function DropDown({ field }) {
  const { extra } = field
  const valueKey = extra.value || field.name

  return (
    <FormGroup>
      {field.label && (
        <ControlLabel>
          {field.label} <FieldRequiredIndicator field={field} />
        </ControlLabel>
      )}
      <FormControl componentClass="select" {...field.bind()}>
        <option value="">Select...</option>
        {extra.options.map((option, index) => (
          <option key={index} value={option[valueKey]}>
            {typeof extra.display === 'function'
              ? extra.display(option)
              : option[extra.display]}
          </option>
        ))}
      </FormControl>
      {field.error && <span className="validation-error">{field.error}</span>}
    </FormGroup>
  )
}

DropDown.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    extra: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object).isRequired,
      value: PropTypes.string,
      display: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    }).isRequired,
    bind: PropTypes.func.isRequired,
  }).isRequired,
}

export default observer(DropDown)
