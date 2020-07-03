import React, { useRef, useEffect, useState, useCallback } from 'react';
import { getUserName, getUserFullName } from 'vizhub-presenters';
import { Avatar } from '../Avatar';
import { Container, UserPreview, UserName } from './styles';

export const UserPreviewList = ({ users, onSelect }) => {
  const [activeIndex, setActiveIndex ] = useState(0);
  
  const containerRef = useRef();

  useEffect(() => {
    if(users.length) {
      containerRef.current.focus();
    }
  }, [users]);

  const handleKeyDown = useCallback((event) => {
    if (users.length === 0 ) return;

    event.preventDefault();

    if (event.key === 'ArrowDown' && activeIndex < users.length - 1) {
      setActiveIndex(activeIndex + 1);
    }

    if (event.key === 'ArrowUp' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }

    if (event.key === 'Enter') {
      onSelect(users[activeIndex]);
    }
  }, [
    users,
    onSelect,
    activeIndex,
    setActiveIndex
  ]);

  return (
    <Container
      ref={containerRef}
      tabIndex="-1"
      onKeyDown={handleKeyDown}
    >
      {users &&
        users.map((user, index) => (
          <UserPreview
            className={index === activeIndex ? 'active' : ''}
            key={getUserName(user)}
            onClick={() => onSelect(user)}
          >
            <Avatar size={24} user={user} isDisabled={true} />
            <UserName>{getUserFullName(user)}</UserName>
          </UserPreview>
        ))}
    </Container>
  );
};
