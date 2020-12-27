import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Hero from './components/Hero';
import TwitterConnect from './components/app/TwitterConnect'
import Dashboard from './components/app/Dashboard'
import FrequencyChart from './components/app/FrequencyChart'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Hero} />
        <Route path="/app/dashboard" exact component={Dashboard} />
        <Route path="/app/charts" exact component={FrequencyChart} />
        <Route path="/app/invites/:uuid/" component={TwitterConnect} />
      </Router>
    );
  }
}

export default App;
