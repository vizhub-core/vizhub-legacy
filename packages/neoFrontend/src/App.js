import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContextProvider } from './authentication';
import { AuthPage, AuthPopupPage, HomePage, CreateVizPage } from './pages';
import { Themed } from './theme';

export const App = () => (
  <Themed>
    <Router>
      <AuthContextProvider>
        <Route exact path="/" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/create-viz" component={CreateVizPage} />
      </AuthContextProvider>
      <Route path="/authenticated" component={AuthPopupPage} />
    </Router>
  </Themed>
);
