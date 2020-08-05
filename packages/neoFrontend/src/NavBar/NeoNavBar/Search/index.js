import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router';
import { useSearchQuery } from '../../../useSearchQuery';
import { ExitableWrapper } from '../../../ExitableWrapper';
import {
  UserPreviewList,
  useUserPreviewController,
  useUsers,
} from '../../../UserPreviewList';
import { SearchInput, Form } from './styles';

export const Search = ({ mobile, redirectPath = '/search' }) => {
  const queryFromLocation = useSearchQuery('query');

  const [query, setQuery] = useState(queryFromLocation);
  const [redirectTo, setRedirectTo] = useState(null);

  const [isInputPristine, setIsInputPristine] = useState(true);

  const users = useUsers(!isInputPristine && query);
  const {
    activeUser,
    selectedUser,
    handleKeyDown,
    handleUserSelect,
  } = useUserPreviewController(users);

  useEffect(() => {
    if (selectedUser) {
      setRedirectTo(`/${selectedUser.userName}`);
    }
  }, [selectedUser, setRedirectTo]);

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

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (isInputPristine) return;

      setRedirectTo(`${redirectPath}?query=${query}`);
    },
    [redirectPath, setRedirectTo, query, isInputPristine]
  );

  const handleExit = useCallback(() => {
    setQuery(queryFromLocation);
    setIsInputPristine(true);
  }, [queryFromLocation]);

  return (
    <Form onSubmit={handleFormSubmit}>
      <ExitableWrapper onKeyDown={handleKeyDown} onExit={handleExit}>
        <SearchInput
          mobile={mobile}
          value={query}
          placeholder="Search"
          onClick={handleFormSubmit}
          onChange={handleQueryChange}
        />
        <UserPreviewList
          user={activeUser}
          users={users}
          onSelect={handleUserSelect}
        />
      </ExitableWrapper>
      {redirectTo && <Redirect push to={redirectTo} />}
    </Form>
  );
};
