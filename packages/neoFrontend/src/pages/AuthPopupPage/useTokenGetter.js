import { useLocation, useParams } from 'react-router';
import { useMemo } from 'react';
import { getJWT } from '../../authentication';
import queryString from 'query-string';

export const useTokenGetter = () => {
  const { provider } = useParams();
  const { search, hash } = useLocation();
  const { code } = queryString.parse(search);
  const { id_token } = queryString.parse(hash);
  
  return useMemo(() => {
    if (code) {
      return getJWT.bind(null, provider, code);
    }

    if (id_token) {
      return getJWT.bind(null, provider, id_token);
    }
  }, [code, id_token, provider]);
};
