import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// Redirect users from 'beta.vizhub.com' to 'vizhub.com'.
if (window.location.host === 'beta.vizhub.com') {
  window.location = window.location.href.replace(
    'beta.vizhub.com',
    'vizhub.com'
  );
} else {
  // A place to put feature previews and easter eggs.
  window.vizhub = {};

  // Wait for prefetched fonts.
  window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
  };
}
