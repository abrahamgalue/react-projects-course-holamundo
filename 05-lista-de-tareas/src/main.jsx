import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { reducer, asyncMiddleware } from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(reducer, applyMiddleware(asyncMiddleware))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
