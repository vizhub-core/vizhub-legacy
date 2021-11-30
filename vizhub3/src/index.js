import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

export const demoApp = () => {
  const App = () => <div className="message">Hello <Button>Bootstrap</Button>!</div>;
  ReactDOM.render(<App />, document.getElementById('root'));
}
