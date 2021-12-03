import React from 'react';
import ReactDOM from 'react-dom';
import { DemoApp } from './DemoApp';

export const demoApp = () => {
  ReactDOM.render(<DemoApp />, document.getElementById('root'));
};
