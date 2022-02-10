import App from 'apps/App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import {AppProviders} from 'auth'
import './index.css'
import 'antd/dist/antd.less'

if (process.env.NODE_ENV === 'development') {
  const {server} = require('./mocks')
  server.start({
    onUnhandledRequest: 'bypass',
    quiet: true,
  })
}

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
