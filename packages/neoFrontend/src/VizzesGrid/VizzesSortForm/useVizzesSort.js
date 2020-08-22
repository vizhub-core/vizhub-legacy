import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSearchQuery } from '../../useSearchQuery';

export const useVizzesSort = (defaultSort) => {
  const sort = useSearchQuery('sort', defaultSort);
  const history = useHistory();

  const isDefault = useCallback((sort) => defaultSort === sort, [defaultSort]);

  const handleSortChange = useCallback(
    (newSort) => {
      history.push({ search: isDefault(newSort) ? '' : `?sort=${newSort}` });
    },
    [history, isDefault]
  );

  return [sort, handleSortChange];
};
