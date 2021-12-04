import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Studio } from './Studio';
import { Home } from './Home';
import { Wrapper } from './styles';

export const App = () => (
  <Router>
    <Wrapper>
      <Route exact path="/" component={Home} />
      <Route path="/:userName/:vizId" component={Studio} />
    </Wrapper>
  </Router>
);
