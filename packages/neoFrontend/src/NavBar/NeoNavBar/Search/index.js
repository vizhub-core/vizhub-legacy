import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router';
import { useSearchQuery } from '../../../useSearchQuery';
import { UserPreviewList, useUsers } from '../../../UserPreviewList';
import { SearchInput, Form } from './styles';

export const Search = ({ mobile, redirectPath = '/search' }) => {
  const queryFromLocation = useSearchQuery('query');

  const [query, setQuery] = useState(queryFromLocation);
  const [redirectTo, setRedirectTo] = useState(null);

  const [isInputPristine, setIsInputPristine] = useState(true);

  // reset submit on location change
  useEffect(() => {
    setRedirectTo(null);
  }, [queryFromLocation]);

  const handleQueryChange = useCallback(
    (event) => {
      setQuery(event.target.value);
      setIsInputPristine(false);
    },
    [setQuery]
  );

  const handleUserSelected = useCallback(
    ({ userName }) => {
      setRedirectTo(`/${userName}`);
    },
    [setRedirectTo]
  );

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setRedirectTo(`${redirectPath}?query=${query}`);
    },
    [redirectPath, setRedirectTo, query]
  );

  const users = useUsers(!isInputPristine && query);

  return (
    <Form onSubmit={handleFormSubmit}>
      <SearchInput
        mobile={mobile}
        value={query}
        placeholder="Search"
        onChange={handleQueryChange}
      />
      <UserPreviewList users={users} onSelect={handleUserSelected} />
      {redirectTo && <Redirect push to={redirectTo} />}
    </Form>
  );
};
