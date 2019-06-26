import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages';

export const App = () => (
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
);
