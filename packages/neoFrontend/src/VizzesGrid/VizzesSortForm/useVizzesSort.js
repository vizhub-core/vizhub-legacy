import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { VIZ_INFO_DEFAULT_SORT_OPTION } from 'vizhub-entities';
import { useSearchQuery } from '../../useSearchQuery';

export const useVizzesSort = (
  defaultSort = VIZ_INFO_DEFAULT_SORT_OPTION.id
) => {
  const sort = useSearchQuery('sort', defaultSort);
  const history = useHistory();

  const isDefault = useCallback((sort) => defaultSort === sort, [defaultSort]);

  const handleSortChange = useCallback(
    (newSort) => {
      history.push({ search: isDefault(newSort) ? '' : `?sort=${newSort}` });
    },
    [history]
  );

  return [sort, handleSortChange];
};
