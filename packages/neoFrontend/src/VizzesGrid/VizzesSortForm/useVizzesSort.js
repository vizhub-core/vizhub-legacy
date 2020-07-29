import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { VIZ_INFO_DEFAULT_SORT_OPTION } from 'vizhub-entities';
import { useSearchQuery } from '../../useSearchQuery';

const isDefault = (sort) => VIZ_INFO_DEFAULT_SORT_OPTION.id === sort;

export const useVizzesSort = () => {
  const sort = useSearchQuery('sort');
  const history = useHistory();

  const handleSortChange = useCallback(
    (newSort) => {
      history.push({ search: isDefault(newSort) ? '' : `?sort=${newSort}` });
    },
    [history]
  );

  return [sort, handleSortChange];
};
