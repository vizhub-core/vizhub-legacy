import { useMemo, useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { fetchUserSearchResults } from './fetchUserSearchResults';

const fetchData = async (typedText) => {
  if (!typedText) return [];
  const results = await fetchUserSearchResults(typedText);
  return results.users;
};

const debounceTimeMS = 500;

export const useUsers = (query) => {
  const typedText$ = useMemo(() => new BehaviorSubject(), []);

  useEffect(() => {
    if (query) {
      typedText$.next(query);
    }

    setResults([]);
  }, [typedText$, query]);

  const [results, setResults] = useState([]);

  const results$ = useMemo(() => {
    const operators = [debounceTime(debounceTimeMS), switchMap(fetchData)];
    return typedText$.pipe(...operators);
  }, [typedText$]);

  useEffect(() => {
    const subscription = results$.subscribe(setResults);
    return () => subscription.unsubscribe();
  }, [results$]);

  return results;
};
