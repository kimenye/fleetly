import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Hero from './components/Hero'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Hero} />
      </Router>
    );
  }
}

export default App;
