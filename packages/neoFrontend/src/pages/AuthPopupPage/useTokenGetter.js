import { useLocation } from 'react-router';
import { useMemo } from 'react';
import { getJWT } from '../../authentication';
import queryString from 'query-string';

export const useTokenGetter = () => {
  const { search, hash } = useLocation();
  const { code, state } = queryString.parse(search);
  const { id_token, state: googleState } = queryString.parse(hash);

  return useMemo(() => {
    if (code) {
      return getJWT.bind(null, state, code);
    }

    if (id_token) {
      return getJWT.bind(null, googleState, id_token);
    }
  }, [code, id_token, state, googleState]);
};
