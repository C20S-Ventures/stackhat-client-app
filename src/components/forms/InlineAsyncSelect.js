import { Component } from 'react'
import PropTypes from 'prop-types'
import { RIESelect } from 'riek'
import { observer } from 'mobx-react'

class InlineAsyncSelect extends Component {

  componentDidMount() {
    this.props.store.Load()
  }

  render() {
    let { store, value, change, propName, textName } = this.props

    if (store.IsLoading)
      return (<span>Loading...</span>)

    let options = store.Items.map((i) => ({ id: `${i[propName]}`, text: i[textName]}))

    return (
      <span className="inline-editable-wrapper" title="Edit">
        <RIESelect value={value} change={(v) => change({ [propName]: v[propName].id })} options={options} propName={propName} className="inline-editable" classEditing="form-control" />
      </span>
    )
  }

}

InlineAsyncSelect.propTypes = {
  store: PropTypes.shape({
    Items: PropTypes.array,
    IsLoading: PropTypes.bool,
    Load: PropTypes.func.isRequired,
  }).isRequired,
  value: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
  textName: PropTypes.string.isRequired,
}

export default observer(InlineAsyncSelect)