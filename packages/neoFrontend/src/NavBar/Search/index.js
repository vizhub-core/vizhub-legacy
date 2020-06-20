import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router';
import { useSearchQuery } from '../../useSearchQuery';
import { UserPreviewList } from '../../UserPreviewList';
import { SearchInput, Form } from './styles';

export const Search = () => {
  const queryFromLocation = useSearchQuery('query');

  const [query, setQuery] = useState(queryFromLocation);
  const [redirectTo, setRedirectTo] = useState(null);

  const [isInputPristine, setIsInputPristine] = useState(true);

  // reset submit on location change
  useEffect(() => {
    setRedirectTo(null);
  }, [queryFromLocation]);

  const onSubmitQuery = useCallback(
    (event) => {
      event.preventDefault();
      setRedirectTo(`/search?query=${query}`);
    },
    [setRedirectTo, query]
  );

  const onUserSelected = useCallback(
    ({ userName }) => {
      setRedirectTo(`/${userName}`);
    },
    [setRedirectTo]
  );

  const onChangeQuery = useCallback(
    (event) => {
      setQuery(event.target.value);
      setIsInputPristine(false);
    },
    [setQuery]
  );

  return (
    <Form onSubmit={onSubmitQuery}>
      <SearchInput
        value={query}
        placeholder="Search"
        onChange={onChangeQuery}
      />
      <UserPreviewList
        query={!isInputPristine && query}
        onSelect={onUserSelected}
      />
      {redirectTo && <Redirect push to={redirectTo} />}
    </Form>
  );
};
