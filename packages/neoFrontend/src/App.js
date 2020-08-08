import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './authentication';
import { ErrorProvider } from './ErrorContext';
import { RealtimeModulesProvider } from './RealtimeModulesContext';
import { ConnectionProvider } from './ConnectionContext';
import { WarningProvider } from './WarningContext';
import { AlertDialogProvider } from './AlertDialogContext';
import {
  AuthPage,
  AuthPopupPage,
  HomePage,
  CreateVizPage,
  CreatingVizFromScratchPage,
  VizPage,
  ProfilePage,
  PricingPage,
  UpgradeSuccessPage,
  UpgradeCanceledPage,
  ContactPage,
  ErrorPage,
  SearchResultsPage,
  ForksPage,
  TermsPage,
} from './pages';
import { Themed } from './theme';

export const App = () => (
  <Themed>
    <Router>
      <ErrorProvider fallback={(error) => <ErrorPage error={error} />}>
        <AlertDialogProvider>
          <AuthProvider>
            <RealtimeModulesProvider>
              <WarningProvider>
                <ConnectionProvider>
                  <Switch>
                    <Route path="/authenticated" component={AuthPopupPage} />
                    <Route exact path="/" component={HomePage} />
                    <Route path="/auth" component={AuthPage} />
                    <Route path="/pricing" component={PricingPage} />
                    <Route
                      path="/upgrade-success"
                      component={UpgradeSuccessPage}
                    />
                    <Route
                      path="/upgrade-canceled"
                      component={UpgradeCanceledPage}
                    />
                    <Route path="/terms" component={TermsPage} />
                    <Route path="/contact" component={ContactPage} />
                    <Route path="/create-viz" component={CreateVizPage} />
                    <Route path="/search" component={SearchResultsPage} />
                    <Route
                      path="/creating-viz-from-scratch"
                      component={CreatingVizFromScratchPage}
                    />
                    <Route
                      path="/:userName/:vizId/forks"
                      component={ForksPage}
                    />
                    <Route path="/:userName/:vizId" component={VizPage} />
                    <Route path="/:userName" component={ProfilePage} />
                  </Switch>
                </ConnectionProvider>
              </WarningProvider>
            </RealtimeModulesProvider>
          </AuthProvider>
        </AlertDialogProvider>
      </ErrorProvider>
    </Router>
  </Themed>
);
