import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => (
  <ul>
    <li>
      <Link to="/someuser/7893274327">Viewer</Link>
    </li>
    <li>
      <Link to="/someuser/7893274327?edit">Configurator</Link>
    </li>
    <li>
      <Link to="/someuser/7893274327?edit&file=index.js">Configurator</Link>
    </li>
  </ul>
);
