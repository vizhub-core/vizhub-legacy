import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router';
import { useSearchQuery } from '../../useSearchQuery';
import { SearchInput } from './styles';

export const Search = () => {
  const queryFromLocation = useSearchQuery('query');

  const [query, setQuery] = useState(queryFromLocation);
  const [submitted, submit] = useState(false);

  // reset submit on location change
  useEffect(() => {
    submit(false);
  }, [queryFromLocation]);

  const onSubmitQuery = useCallback(
    event => {
      event.preventDefault();
      submit(true);
    },
    [submit]
  );

  const onChangeQuery = useCallback(event => setQuery(event.target.value), [
    setQuery
  ]);

  return (
    <form onSubmit={onSubmitQuery}>
      <SearchInput
        value={query}
        placeholder="Search"
        onChange={onChangeQuery}
      />
      {submitted && <Redirect push to={`/search?query=${query}`} />}
    </form>
  );
};
