import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StudioPage, HomePage } from './pages';
import { AppWrapper, GlobalStyle } from './styles';

export const App = () => (
  <Router>
    <AppWrapper>
      <GlobalStyle />
      <Route exact path="/" component={HomePage} />
      <Route path="/:user/:id" component={StudioPage} />
    </AppWrapper>
  </Router>
);
