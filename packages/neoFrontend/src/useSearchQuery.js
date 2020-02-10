import { useLocation } from 'react-router';

export const useSearchQuery = key => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  return searchParams.get(key) || '';
};
