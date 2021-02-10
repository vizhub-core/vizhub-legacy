import { useCallback } from 'react';
import { VIZ_INFO_DEFAULT_SORT_OPTION } from 'vizhub-entities';
import { useSearchState } from '../../useSearchQuery';

const isDefault = (sort) => VIZ_INFO_DEFAULT_SORT_OPTION.id === sort;

export const useVizzesSort = () => {
  const [search, setSearch] = useSearchState();
  const { sort = VIZ_INFO_DEFAULT_SORT_OPTION.id } = search;

  const handleSortChange = useCallback(
    (newSort) => {
      setSearch({ sort: isDefault(newSort) ? undefined : newSort });
    },
    [setSearch]
  );

  return [sort, handleSortChange];
};
