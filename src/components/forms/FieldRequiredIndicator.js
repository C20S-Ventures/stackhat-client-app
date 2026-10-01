import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

function FieldRequiredIndicator({ field }) {
  if (field.rules && field.rules.split('|').indexOf('required') > -1) {
    return <span className="field-required-indicator">*</span>
  }
  return null
}

FieldRequiredIndicator.propTypes = {
  field: PropTypes.shape({
    rules: PropTypes.string,
  }).isRequired,
}

export default observer(FieldRequiredIndicator)
