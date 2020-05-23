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

  const { addCollaborator } = useCollaborators();

  const handleAddCollaboratorClick = useCallback(
    (userId) => {
      addCollaborator(userId);
      setTypedText('');
      setResults([]);
    },
    [addCollaborator]
  );

  return (
    <>
      {showCollaboratorsAnyoneCanEdit ? <AnyoneCanEdit /> : null}
      {showCollaboratorsManagement ? (
        <>
          <Spacer height={22} />
          <SubSectionDescription>
            Start typing to search available collaborators for this
            visualization.
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
        </>
      ) : null}
    </>
  );
};
