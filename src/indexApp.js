import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import QueryString from 'query-string'

import './config'

// version
import Version from './services/Version'
if (process.env.NODE_ENV !== 'production') {
  console.log(`[APP] v${Version}`)
}

import {
  AuthenticationStore as auth
} from './stores'

import './Styles.scss'
import './Print.scss'

import ErrorBoundary from './components/errors/ErrorBoundary'
import Master from './areas/Master'

import './assets/icon.png'
import './assets/spinner.svg'
import { Stores } from './services'

const hash = QueryString.parse(location.hash)
if (hash.mode === "logout") {
  auth.SignOut()
}

// init auth
auth.Initialise()
  .then(() => {

    const stores = new Stores([])

    const container = document.getElementById('root')
    const root = createRoot(container)

    // render
    root.render(
      <ErrorBoundary>
        <Provider
          Authentication={auth}
          Settings={auth.Settings}
          Stores={stores}
          {...stores}
        >
          <BrowserRouter>
            <Master />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    )

  })
