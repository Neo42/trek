import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from 'apps/App'
import {AppProvider} from 'auth'
import {HelmetProvider} from 'react-helmet-async'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.less'

const {server} = require('./mocks')
server.start({
  onUnhandledRequest: 'bypass',
  quiet: true,
})

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
