import { stateDecoder } from './stateDecoder';

const url = (state) => {
  const type = state ? stateDecoder(state) : 'ci';
  return `/api/auth/${type}`;
};

export const getJWT = async (parameter, code) => {
  const response = await fetch(url(parameter), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  return await response.json();
};
