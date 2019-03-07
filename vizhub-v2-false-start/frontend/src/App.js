import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StudioPage, HomePage } from './pages';
import { AppWrapper } from './styles';

export const App = () => (
  <Router>
    <AppWrapper>
      <Route exact path="/" component={HomePage} />
      <Route path="/:user/:id" component={StudioPage} />
    </AppWrapper>
  </Router>
);
