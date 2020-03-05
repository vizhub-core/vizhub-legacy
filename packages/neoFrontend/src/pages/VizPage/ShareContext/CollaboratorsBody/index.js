import React, { useMemo, useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { SubSectionDescription, Spacer } from '../../styles';
import { Input } from '../../../../Input';
import { FormRow } from '../../styles';

const fetchData = typedText => {
  if (!typedText) return Promise.resolve([]);
  return new Promise(resolve => {
    console.log('Fetching data for ' + typedText);
    setTimeout(() => {
      resolve([
        {
          id: '47895473289547832938754',
          fullName: 'CI',
          email: 'ci@testing.com',
          userName: 'ci',
          avatarUrl: 'https://avatars0.githubusercontent.com/u/639823?v=4'
        }
      ]);
    }, Math.random() * 1000);
  });
};

const debounceTimeMS = 500;
export const CollaboratorsBody = () => {
  const [typedText, setTypedText] = useState('');
  const typedText$ = useMemo(() => new BehaviorSubject(), []);
  useEffect(() => {
    typedText$.next(typedText);
  }, [typedText$, typedText]);

  const [results, setResults] = useState([]);
  const results$ = useMemo(
    () => typedText$.pipe(debounceTime(debounceTimeMS), switchMap(fetchData)),
    [typedText$]
  );
  useEffect(() => results$.subscribe(setResults).unsubscribe, [results$]);

  console.log(results);

  return (
    <>
      <SubSectionDescription>
        Start typing to search available collaborators for this visualization.
      </SubSectionDescription>
      <Spacer height={22} />
      <FormRow>
        <Input value={typedText} onChange={setTypedText} size="grow" />
      </FormRow>
    </>
  );
};
