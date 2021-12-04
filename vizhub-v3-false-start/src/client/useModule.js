import { useState, useEffect, useContext } from 'react';
import { RequireContext } from './RequireContext';

// A hook for dynamically requiring (lazy loading) modules.
export const useModule = (path) => {
  const [module, setModule] = useState({});
  const require = useContext(RequireContext);
  useEffect(() => {
    if (require) require(path).then(setModule);
  }, [require]);
  return module;
};
