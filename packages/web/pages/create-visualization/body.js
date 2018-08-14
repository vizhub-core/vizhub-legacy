import React from 'react';

export const BodyAuthenticated = ({onFromScratchClick}) => {
  const fromScratchClick = e => {
    e.preventDefault();
    onFromScratchClick();
  };

  return process.env.NODE_ENV === 'development'
    ? (
      <a className='button test-from-scratch-button' href='#scratch' onClick={fromScratchClick}>
        Start from scratch
      </a>
    )
    : (
      <React.Fragment>
        <div>
          Create a visualization by forking one of these starter templates.
        </div>
        <div style={{ marginTop: '1.25rem' }} >
          <a className='button' href='https://vizhub.com/curran/86a75dc8bdbe4965ba353a79d4bd44c8'>
            Hello World
          </a>
        </div>
      </React.Fragment>
    );
};

export const BodyNotAuthenticated = () => (
  <div>You must first log in to create a visualization.</div>
);
