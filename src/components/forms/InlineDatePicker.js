import PropTypes from 'prop-types'
import { RIEInput } from 'riek'
import ReactDatePicker from 'react-16-bootstrap-date-picker'
import { FormatDate } from '../formatting'
import Moment from 'moment'

class InlineDatePicker extends RIEInput {
  newValue = null

  keyDown = (event) => {
    if (event.keyCode === 27) {
      this.cancelEditing()
    }
  }

  finishEditing = () => {
    if (this.props.beforeFinish) {
      this.props.beforeFinish()
    }
    const newValue = this.newValue
    const result = this.doValidations(newValue)
    if (result && this.props.value !== newValue) {
      this.commit(newValue)
    }
    if (!result && this.props.handleValidationFail) {
      this.props.handleValidationFail(result, newValue, () => this.cancelEditing())
    } else {
      this.cancelEditing()
    }
    if (this.props.afterFinish) {
      this.props.afterFinish()
    }
  }

  renderEditingComponent = () => {
    const dateValue = this.state.newValue || this.props.value || new Date()
    return (
      <span className="inline-editable-wrapper">
        <ReactDatePicker
          dateFormat="DD/MM/YYYY"
          value={new Moment(dateValue).format('YYYY-MM-DD')}
          disabled={this.state.loading}
          className={this.makeClassString()}
          onChange={(val) => {
            this.newValue = new Date(val)
            this.finishEditing()
          }}
          onBlur={() => this.cancelEditing()}
          onKeyDown={this.keyDown}
          ref="input"
          calendarPlacement="bottom"
          autoFocus={true}
          {...this.props.editProps}
        />
      </span>
    )
  }

  renderNormalComponent = () => {
    const displayValue = this.state.newValue || this.props.value
    return (
      <div className="inline-editable-wrapper" title="Edit">
        <span className="inline-editable">
          <span
            tabIndex="0"
            className={this.makeClassString()}
            onFocus={this.startEditing}
            onClick={this.startEditing}
            {...this.props.defaultProps}
          >
            {displayValue ? (
              <FormatDate value={displayValue} />
            ) : (
              <span>(empty)</span>
            )}
          </span>
        </span>
      </div>
    )
  }
}

InlineDatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  change: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
  beforeFinish: PropTypes.func,
  afterFinish: PropTypes.func,
  handleValidationFail: PropTypes.func,
  editProps: PropTypes.object,
  defaultProps: PropTypes.object,
}

export default InlineDatePicker
