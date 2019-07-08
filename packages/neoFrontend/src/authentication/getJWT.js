import { CI_USER_CODE } from './constants';

const url = code => {
  const isCICode = code === CI_USER_CODE;
  const isDev = process.env.NODE_ENV === 'development';
  const isCI = isCICode && isDev;
  return '/api/auth/' + isCI ? 'ci' : 'github';
};

export const getJWT = async code => {
  const response = await fetch(url(code), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  });
  return await response.json();
};
