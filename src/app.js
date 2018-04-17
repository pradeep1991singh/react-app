// $FlowFixMe

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import store from './store'
import Header from './common/header/header'
import Routes from './routes'
import './app.css'

class App extends Component<void, void> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Header />
            <div className="main-container">
              <Routes />
            </div>
            <ToastContainer autoClose={1500} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
