import { CI_USER_CODE } from './constants';

const url = (state, code) => {
  const type = state ? state : code === CI_USER_CODE ? 'ci' : 'github';
  return `/api/auth/${type}`;
};

export const getJWT = async (parameter, code) => {
  const response = await fetch(url(parameter, code), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  return await response.json();
};
