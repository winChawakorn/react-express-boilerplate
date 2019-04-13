import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Applications from './pages/Applications'
import ApplicationForm from './pages/ApplicationForm'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Applications />} />
        <Route path="/application" component={() => <ApplicationForm />} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
