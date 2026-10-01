import PropTypes from 'prop-types'
import { ControlLabel, FormGroup } from 'react-bootstrap'
import Moment from 'moment'
import ReactDatePicker from 'react-16-bootstrap-date-picker'
import FieldRequiredIndicator from './FieldRequiredIndicator'

function DatePicker({ field }) {
  const getValue = () => {
    if (typeof field.value === 'object') {
      return Moment(field.value).format('YYYY-MM-DD')
    }
    return field.value === '' ? undefined : field.value
  }

  return (
    <FormGroup className="datepicker">
      {field.label && (
        <ControlLabel>
          {field.label} <FieldRequiredIndicator field={field} />
        </ControlLabel>
      )}
      <ReactDatePicker
        dateFormat="DD/MM/YYYY"
        {...field.bind({
          value: getValue(),
          change: (e) => field.onChange(e),
        })}
        showTodayButton={true}
      />
      {field.error && <span className="validation-error">{field.error}</span>}
    </FormGroup>
  )
}

DatePicker.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    error: PropTypes.string,
    bind: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
}

export default DatePicker
