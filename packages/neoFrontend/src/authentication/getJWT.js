import { CI_USER_CODE } from './constants';

const url = (code) => {
  const isCI = code === CI_USER_CODE;
  return `/api/auth/${isCI ? 'ci' : 'github'}`;
};

export const getJWT = async (code) => {
  const response = await fetch(url(code), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  return await response.json();
};
