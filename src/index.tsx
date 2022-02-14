import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider as ReduxProvider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import App from 'apps/App'
import {AppProvider} from 'auth'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.less'
import {store} from 'store'
const {server} = require('./mocks')
server.start({
  onUnhandledRequest: 'bypass',
  quiet: true,
})

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <AppProvider>
            <App />
          </AppProvider>
        </ReduxProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
