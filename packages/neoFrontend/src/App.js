import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { AuthPage, AuthPopupPage, AuthContextProvider } from './authentication';

export const App = () => (
  <Router>
    <AuthContextProvider>
      <Route exact path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
    </AuthContextProvider>
    <Route path="/authenticated" component={AuthPopupPage} />
  </Router>
);
