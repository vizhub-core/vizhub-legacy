import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  showCollaboratorsAnyoneCanEdit,
  showCollaboratorsManagement
} from '../../../../featureFlags';
import { BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { SubSectionDescription, Spacer } from '../../styles';
import { Input } from '../../../../Input';
import { Avatar } from '../../../../Avatar';
import { FormRow } from '../../styles';
import { fetchUserSearchResults } from './fetchUserSearchResults';
import { UserPreviewList, UserPreview, UserName } from './styles';

const fetchData = async typedText => {
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

  const addCollaborator = useCallback(userId => {
    console.log('add collaborator ' + userId);
    setTypedText('');
    setResults([]);
  }, []);

  return (
    <>
      {showCollaboratorsAnyoneCanEdit ? <div>Anyone can edit</div> : null}
      {showCollaboratorsManagement ? (
        <>
          <SubSectionDescription>
            Start typing to search available collaborators for this
            visualization.
          </SubSectionDescription>
          <Spacer height={22} />
          <FormRow>
            <Input value={typedText} onChange={setTypedText} size="grow" />
            <UserPreviewList>
              {results &&
                results.map(user => (
                  <UserPreview
                    key={user.userName}
                    onClick={() => addCollaborator(user.id)}
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
