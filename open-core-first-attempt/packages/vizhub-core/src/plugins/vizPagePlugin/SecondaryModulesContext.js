import React, { createContext, useEffect, useState } from 'react';
import { isClient } from '../../isomorphic/isClient';
import { jsDelivrCombine } from '../../isomorphic/jsDelivrCombine';

// We use Rollup to bundle ES modules in the browser.
const rollupVersion = '2.55.1';
// TODO magicsandbox

// Loads secondary modules with one CDN request.
const loadSecondaryModules = (callback) => {
  const libraries = jsDelivrCombine([
    `rollup@${rollupVersion}/dist/rollup.browser.js`,
  ]);

  const script = document.createElement('script');
  script.onload = () => {
    callback({ rollup });
  };
  script.setAttribute('src', libraries);
  document.body.appendChild(script);
};

export const SecondaryModulesContext = createContext();

export const SecondaryModulesContextProvider = ({ children }) => {
  const [secondaryModules, setSecondaryModules] = useState(null);

  useEffect(() => {
    loadSecondaryModules(setSecondaryModules);
  }, []);

  return (
    <SecondaryModulesContext.Provider value={secondaryModules}>
      {children}
    </SecondaryModulesContext.Provider>
  );
};
