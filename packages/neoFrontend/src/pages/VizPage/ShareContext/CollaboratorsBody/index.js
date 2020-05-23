import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import {
  showCollaboratorsAnyoneCanEdit,
  showCollaboratorsManagement,
} from '../../../../featureFlags';
import { Input } from '../../../../Input';
import { Avatar } from '../../../../Avatar';
import { SubSectionDescription, Spacer, FormRow } from '../../styles';
import { fetchUserSearchResults } from './fetchUserSearchResults';
import { UserPreviewList, UserPreview, UserName } from './styles';
import { AnyoneCanEdit } from './AnyoneCanEdit';
import { useCollaborators } from './useCollaborators';
import { CollaboratorList } from './CollaboratorList';

const fetchData = async (typedText) => {
  if (!typedText) return [];
  const results = await fetchUserSearchResults(typedText);
  return results.users;
};

const debounceTimeMS = 500;
export const CollaboratorsBody = () => {
  const [typedText, setTypedText] = useState('');
  const typedText$ = useMemo(() => new BehaviorSubject(), []);
  useEffect(() => {
    typedText$.next(typedText);
    setResults([]);
  }, [typedText$, typedText]);

  const [results, setResults] = useState([]);
  const results$ = useMemo(
    () => typedText$.pipe(debounceTime(debounceTimeMS), switchMap(fetchData)),
    [typedText$]
  );
  useEffect(() => {
    const subscription = results$.subscribe(setResults);
    return () => subscription.unsubscribe();
  }, [results$]);

  const { collaborators, addCollaborator } = useCollaborators();

  const handleAddCollaboratorClick = useCallback(
    (userId) => {
      addCollaborator(userId);
      setTypedText('');
      setResults([]);
    },
    [addCollaborator]
  );

  // Support hitting the enter key to select first result.
  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (results && results.length > 0) {
        handleAddCollaboratorClick(results[0].id);
      }
    },
    [results, handleAddCollaboratorClick]
  );

  return (
    <>
      {showCollaboratorsAnyoneCanEdit ? (
        <>
          <SubSectionDescription>
            If you check this box, anyone with the link can edit this viz.
          </SubSectionDescription>
          <AnyoneCanEdit />
        </>
      ) : null}

      {showCollaboratorsManagement ? (
        <>
          {collaborators && <CollaboratorList collaborators={collaborators} />}
          <form onSubmit={handleFormSubmit}>
            <Spacer height={22} />
            <SubSectionDescription>
              Start typing to search for collaborators to add.
            </SubSectionDescription>
            <Spacer height={22} />
            <FormRow>
              <Input value={typedText} onChange={setTypedText} size="grow" />
              <UserPreviewList>
                {results &&
                  results.map((user) => (
                    <UserPreview
                      key={user.userName}
                      onClick={() => handleAddCollaboratorClick(user.id)}
                    >
                      <Avatar size={24} user={user} isDisabled={true} />
                      <UserName>{user.fullName}</UserName>
                    </UserPreview>
                  ))}
              </UserPreviewList>
            </FormRow>
          </form>
        </>
      ) : null}
    </>
  );
};
