import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './authentication';
import { ErrorProvider } from './ErrorContext';
import { AlertDialogProvider } from './AlertDialogContext';
import {
  AuthPage,
  AuthPopupPage,
  HomePage,
  CreateVizPage,
  CreatingVizFromScratchPage,
  VizPage,
  ProfilePage,
  ContactPage,
  ErrorPage
} from './pages';
import { Themed } from './theme';

export const App = () => (
  <Themed>
    <Router>
      <ErrorProvider fallback={error => <ErrorPage error={error} />}>
        <AlertDialogProvider>
          <AuthProvider>
            <Switch>
              <Route path="/authenticated" component={AuthPopupPage} />
              <Route exact path="/" component={HomePage} />
              <Route path="/auth" component={AuthPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/create-viz" component={CreateVizPage} />
              <Route
                path="/creating-viz-from-scratch"
                component={CreatingVizFromScratchPage}
              />
              <Route path="/:userName/:vizId" component={VizPage} />
              <Route path="/:userName" component={ProfilePage} />
            </Switch>
          </AuthProvider>
        </AlertDialogProvider>
      </ErrorProvider>
    </Router>
  </Themed>
);
