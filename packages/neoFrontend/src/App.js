import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './authentication';
import { ErrorProvider } from './ErrorContext';
import {
  AuthPage,
  AuthPopupPage,
  HomePage,
  CreateVizPage,
  CreatingVizFromScratchPage,
  VizPage,
  ErrorPage
} from './pages';
import { Themed } from './theme';

export const App = () => (
  <Themed>
    <Router>
      <ErrorProvider fallback={error => <ErrorPage error={error} />}>
        <AuthProvider>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/create-viz" component={CreateVizPage} />
          <Route
            path="/creating-viz-from-scratch"
            component={CreatingVizFromScratchPage}
          />
          <Route path="/:userName/:vizId" component={VizPage} />
        </AuthProvider>
        <Route path="/authenticated" component={AuthPopupPage} />
      </ErrorProvider>
    </Router>
  </Themed>
);
