import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StudioPage, HomePage } from './pages';
import { AppWrapper } from './styles';
import { UserPreferencesProvider } from './userPreferences';

export const App = () => (
  <Router>
    <UserPreferencesProvider>
      <AppWrapper>
        <Route exact path="/" component={HomePage} />
        <Route path="/:user/:id" component={StudioPage} />
      </AppWrapper>
    </UserPreferencesProvider>
  </Router>
);
