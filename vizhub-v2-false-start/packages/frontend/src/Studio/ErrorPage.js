import React from 'react';

export const ErrorPage = ({ error }) => {
  const { statusCode, title, message } = error;
  return (
    <>
      <h1>{statusCode}</h1>
      <h1>{title}</h1>
      <div>{message}</div>
    </>
  );
};
