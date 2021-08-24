import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  'bootstrap/dist/css/bootstrap.min.css'

import App from '../components/App'
import NavigationBar from '../components/Layout/NavigationBar'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <NavigationBar />
      <Route path="/" component={App}/>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})