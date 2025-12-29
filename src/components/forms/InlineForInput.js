import { Component } from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { inject } from 'mobx-react'
import { InlineTagsInput } from './'
import FormatForCode from '../formatting/FormatForCode'

class InlineForInput extends Component {
  render() {
    const { props } = this

    return (
      <InlineTagsInput
        icon="folder"
        value={sortBy(props.items, (o) =>
          o.Name ? o.Name : o.Classification ? o.Classification.Name : 'Unknown'
        )}
        editConfig={
          props.editable
            ? {
                apiSet: 'FORs',
                idKey: 'ClassificationID',
                searchKey: 'Code_Name',
                labelKey: (item) => `${item.Code} - ${item.Name}`,
                searchLimit: 9999,
                minLength: 3,
                selectedLabelResolver: (item) =>
                  `${FormatForCode.TrimCode(item.Code)} - ${item.Name}`,
                onAddTag: (adding) => {
                  return props.store.AddFor(props.id, adding.ClassificationID, adding).then(
                    (record) => {
                      if (props.onAfterUpdate) setTimeout(props.onAfterUpdate, 0)
                      return record
                    }
                  )
                },
                onRemoveTag: (removing) => {
                  return props.store.RemoveFor(removing[props.linkIdName]).then((record) => {
                    if (props.onAfterUpdate) setTimeout(props.onAfterUpdate, 0)
                    return record
                  })
                },
                onValidateRemoveTag: (removing) => {
                  return props.Authentication.IsUser(removing.UserID)
                },
              }
            : null
        }
        textResolver={(tag) =>
          tag.Name ? tag.Name : tag.Classification ? tag.Classification.Name : 'Unknown'
        }
        titleResolver={(tag) =>
          `FOR: ${tag.Code ? tag.Code : tag.Classification ? tag.Classification.Code : 'Unknown'}`
        }
        idKey={props.linkIdName}
        change={() => {}}
        propName="NA"
        emptyText={`No FoRs defined.${props.editable ? ' Click to edit.' : ''}`}
      />
    )
  }
}

InlineForInput.propTypes = {
  items: PropTypes.array,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editable: PropTypes.bool,
  linkIdName: PropTypes.string.isRequired,
  onAfterUpdate: PropTypes.func,
  store: PropTypes.shape({
    AddFor: PropTypes.func.isRequired,
    RemoveFor: PropTypes.func.isRequired,
  }),
  Authentication: PropTypes.shape({
    IsUser: PropTypes.func.isRequired,
  }).isRequired,
}

InlineForInput.defaultProps = {
  items: [],
  editable: false,
}

export default inject('Authentication')(InlineForInput)
