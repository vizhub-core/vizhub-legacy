import { useState, useEffect } from 'react';

const identity = x => x;

// A hook for extracting some nested state from a BehaviorSubject.
export const useValue = (behaviorSubject$, accessor = identity) => {
  const [value, setValue] = useState(accessor(behaviorSubject$.getValue()));
  useEffect(() => {
    const subscription = behaviorSubject$.subscribe(behaviorSubject => {
      setValue(accessor(behaviorSubject));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [behaviorSubject$, accessor]);
  return value;
};
