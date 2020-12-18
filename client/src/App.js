import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Hero from './components/Hero';
import TwitterConnect from './components/app/TwitterConnect'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Hero} />
        <Route path="/user/invitations/:uuid/" component={TwitterConnect} />
      </Router>
    );
  }
}

export default App;
