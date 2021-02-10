import { useCallback, useEffect, useRef, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';

import { omitUndefined } from './utils/object';

const toObject = (searchParams) => {
  return Array.from(searchParams.entries()).reduce(
    (params, [key, value]) => (params[key] = value) && params,
    {}
  );
};

const fromObject = (searchParamsObject) => {
  return Object.entries(omitUndefined(searchParamsObject)).reduce(
    (params, [key, value]) => {
      params.set(key, value);
      return params;
    },
    new URLSearchParams()
  );
};

export const useSearchQuery = (key, defaultValue = '') => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return key ? searchParams.get(key) || defaultValue : toObject(searchParams);
};

export const useSearchState = ({ rewrite } = { rewrite: false }) => {
  const history = useHistory();
  const { search } = useLocation();

  const searchParamsObject = useMemo(
    () => toObject(new URLSearchParams(search)),
    [search]
  );

  const prevSearchParamsObjectRef = useRef(null);

  useEffect(() => {
    prevSearchParamsObjectRef.current = searchParamsObject;
  }, [searchParamsObject]);

  const setSearch = useCallback(
    (newSearchOrSetter) => {
      let newSearchParamsObject = newSearchOrSetter;
      if (typeof newSearchOrSetter === 'function') {
        newSearchParamsObject = newSearchOrSetter(prevSearchParamsObjectRef.current);
      }

      let currentSearchParamsObject = prevSearchParamsObjectRef.current;
      let newSearchParams = fromObject(currentSearchParamsObject);

      if (rewrite) {
        newSearchParams = fromObject(newSearchParamsObject);
      } else {
        newSearchParams = fromObject({
          ...currentSearchParamsObject,
          ...newSearchParamsObject,
        });
      }

      history.push({ search: newSearchParams.toString() });
    },
    [history, prevSearchParamsObjectRef, rewrite]
  );

  return [searchParamsObject, setSearch];
};
