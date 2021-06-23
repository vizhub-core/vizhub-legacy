import { useState, useEffect, useContext } from 'react';
import { RequireContext } from './RequireContext';

export const useModule = (path) => {
  const [module, setModule] = useState({});
  const require = useContext(RequireContext);
  useEffect(() => {
    if (require) require(path).then(setModule);
  }, [require]);
  return module;
};
