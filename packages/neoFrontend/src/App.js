import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { AuthPopupPage, AuthContextProvider } from './authentication';

export const App = () => (
  <Router>
    <AuthContextProvider>
      <Route exact path="/" component={HomePage} />
    </AuthContextProvider>
    <Route path="/authenticated" component={AuthPopupPage} />
  </Router>
);
