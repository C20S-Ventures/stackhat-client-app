import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'react-bootstrap'

function CheckBoxes({ field, options: initialOptions }) {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const opts = [...initialOptions]
    setOptions(opts)
    field.set(opts)
  }, [initialOptions, field])

  const handleCheckChange = (index) => {
    const updatedOptions = [...options]
    updatedOptions[index].checked = !updatedOptions[index].checked
    setOptions(updatedOptions)
    field.set(updatedOptions)
  }

  return (
    <div>
      {!options.length && <span>No items</span>}
      {options.map((option, index) => (
        <Checkbox
          key={index}
          onChange={() => handleCheckChange(index)}
          checked={option.checked}
        >
          <strong>{option.text}</strong>
          {option.description && (
            <em>
              <br />
              {option.description}
            </em>
          )}
        </Checkbox>
      ))}
    </div>
  )
}

CheckBoxes.propTypes = {
  field: PropTypes.shape({
    set: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      description: PropTypes.string,
      checked: PropTypes.bool,
    })
  ),
}

CheckBoxes.defaultProps = {
  options: [],
}

export default CheckBoxes
