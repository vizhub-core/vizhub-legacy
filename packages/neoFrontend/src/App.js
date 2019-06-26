import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, Authenticated } from './pages';
import { AuthContextProvider } from './authentication';

export const App = () => (
  <AuthContextProvider>
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/authenticated" component={Authenticated} />
    </Router>
  </AuthContextProvider>
);
