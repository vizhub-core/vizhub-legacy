import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './Home';
import { Wrapper } from './styles';

export const App = () => (
  <Router>
    <Wrapper>
      <Route exact path="/" component={Home} />
    </Wrapper>
  </Router>
);
