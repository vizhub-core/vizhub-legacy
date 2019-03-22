import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Studio } from './Studio';
import { Home } from './Home';
import { Wrapper } from './styles';
import { UserPreferencesProvider } from './userPreferences';

export const App = () => (
  <Router>
    <Wrapper>
      <UserPreferencesProvider>
        <Route exact path="/" component={Home} />
        <Route path="/:user/:id" component={Studio} />
      </UserPreferencesProvider>
    </Wrapper>
  </Router>
);
