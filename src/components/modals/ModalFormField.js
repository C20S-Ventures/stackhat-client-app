import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormGroup, FormControl, Checkbox, HelpBlock } from 'react-bootstrap'
import { observer } from 'mobx-react'
import FieldRequiredIndicator from '../forms/FieldRequiredIndicator'
import Api from '../../services/Api'
import { CheckBoxes } from '../forms'

function ModalFormField({ id, field, help }) {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAsyncLoad, setIsAsyncLoad] = useState(false)

  useEffect(() => {
    // select with async load
    if ((field.type === 'select' || field.type === 'checkboxes') && field.extra?.source === 'api') {
      setIsAsyncLoad(true)

      // load options
      Api[field.extra.set].query(null, field.extra.setParams).then((response) => {
        if (field.type === 'select') {
          setOptions([
            { text: field.placeholder || 'Select...', value: '' },
            ...response.map((r) => field.extra.itemMap(r)),
          ])
        } else if (field.type === 'checkboxes') {
          setOptions([...response.map((r) => field.extra.itemMap(r))])
        }
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [field])

  const hasLabel = field.type !== 'checkbox'

  if (isLoading) {
    return null
  }

  const renderInput = () => {
    return <FormControl {...field.bind()} componentClass={field.type} />
  }

  const renderSelect = () => {
    return (
      <FormControl {...field.bind()} componentClass={field.type}>
        {isAsyncLoad && isLoading && <option>Loading...</option>}
        {options.length > 0 &&
          options.map((option, key) => (
            <option key={key} value={option.value}>
              {option.text}
            </option>
          ))}
      </FormControl>
    )
  }

  const renderCheckbox = () => {
    return <Checkbox {...field.bind()}>{field.label}</Checkbox>
  }

  const renderCheckboxes = () => {
    if (isLoading) {
      return null
    }
    return <CheckBoxes field={field} options={options} />
  }

  return (
    <FormGroup controlId={id}>
      {field.label && hasLabel && (
        <ControlLabel>
          {field.label} <FieldRequiredIndicator field={field} />
        </ControlLabel>
      )}

      {/* render basic inputs */}
      {['input', 'textarea'].indexOf(field.type) > -1 && renderInput()}

      {/* render selects */}
      {field.type === 'select' && renderSelect()}

      {/* render checkbox */}
      {field.type === 'checkbox' && renderCheckbox()}

      {/* render checkboxes */}
      {field.type === 'checkboxes' && renderCheckboxes()}

      {field.error && (
        <span className="validation-error" role="alert">
          {field.error}
        </span>
      )}
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

ModalFormField.propTypes = {
  id: PropTypes.string,
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    extra: PropTypes.shape({
      source: PropTypes.string,
      set: PropTypes.string,
      setParams: PropTypes.object,
      itemMap: PropTypes.func,
    }),
    bind: PropTypes.func.isRequired,
  }).isRequired,
  help: PropTypes.string,
}

ModalFormField.defaultProps = {
  id: undefined,
  help: undefined,
}

export default observer(ModalFormField)
