import { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Pagination, ButtonGroup, Button } from 'react-bootstrap'
import { scroller } from 'react-scroll'

const maxPagesListed = 10

class Paginator extends Component {
  handlePageClick(page, pages) {
    if (page < 1 || page > pages) {
      return
    }

    this.props.store.ExtendQuery({ api_page: page })
    this.props.store.Load().then(() => {
      if (this.props.onChange) this.props.onChange()
    })

    if (this.props.scrollToElementName) {
      scroller.scrollTo(this.props.scrollToElementName, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
      })
    }
  }

  handlePageSize = (size) => {
    this.props.store.ExtendQuery({ api_page: 1, api_limit: size })
    this.props.store.Load()
  }

  render() {
    const { store, pageSizes } = this.props

    if (store) {
      // calculate pages
      const pages = Math.ceil(
        store.Total % store.Query.api_limit !== 0
          ? store.Total / store.Query.api_limit
          : store.Total / store.Query.api_limit
      )
      const page = store.Query.api_page

      // start/end
      const offset = maxPagesListed / 2
      let start = pages > maxPagesListed ? page - offset : 1
      let end = pages > maxPagesListed ? page + offset : pages
      if (start < 1) {
        end += start * -1
        start = 1
      }
      if (end > pages) {
        start -= end - pages - 1
        start = start < 1 ? 1 : start
        end = pages
      }

      const items = []
      for (let number = start; number <= end; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === page}
            onClick={() => this.handlePageClick(number, pages)}
          >
            {number}
          </Pagination.Item>
        )
      }

      if (store.Total > 0 && (pages > 1 || pageSizes)) {
        return (
          <div className="paginator text-center">
            {pages > 1 && (
              <Pagination>
                <Pagination.Prev onClick={() => this.handlePageClick(page - 1, pages)} />
                {start > 1 && (
                  <Pagination.Item onClick={() => this.handlePageClick(1, pages)}>
                    {1}
                  </Pagination.Item>
                )}
                {start > 2 && <Pagination.Ellipsis />}

                {items}

                {end < pages - 1 && <Pagination.Ellipsis />}
                {end < pages && (
                  <Pagination.Item onClick={() => this.handlePageClick(pages, pages)}>
                    {pages}
                  </Pagination.Item>
                )}
                <Pagination.Next onClick={() => this.handlePageClick(page + 1, pages)} />
              </Pagination>
            )}

            {pageSizes && (
              <ButtonGroup className="pull-right">
                {pageSizes.map((v) => (
                  <Button
                    key={v}
                    title={`Show ${v} Records Per Page`}
                    active={v === store.Query.api_limit}
                    onClick={() => this.handlePageSize(v)}
                  >
                    {v}
                  </Button>
                ))}
              </ButtonGroup>
            )}
            <div></div>
          </div>
        )
      }
    }

    return null
  }
}

Paginator.propTypes = {
  store: PropTypes.shape({
    Total: PropTypes.number,
    Query: PropTypes.shape({
      api_page: PropTypes.number,
      api_limit: PropTypes.number,
    }),
    ExtendQuery: PropTypes.func.isRequired,
    Load: PropTypes.func.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
  scrollToElementName: PropTypes.string,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
}

Paginator.defaultProps = {
  onChange: undefined,
  scrollToElementName: undefined,
  pageSizes: undefined,
}

export default observer(Paginator)
