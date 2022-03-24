import React, { useCallback, useRef } from 'react';
import { HomePage, VizPreview, AuthenticatedUserDropdown } from '../ui';
import { Dropdown } from '../ui/Bootstrap';

const LogOut = () => {
  const ref = useRef();

  const handleLogout = useCallback(() => {
    ref.current.submit();
  }, []);

  return (
    <form ref={ref} action="/logout" method="post">
      <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
      <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
    </form>
  );
};

export const LogInWidgetPresenter = ({ authenticatedUser }) => {
  const handleLogout = useCallback(async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ _csrf: 'TODO make csrf work' }),
    });
  }, []);

  return authenticatedUser ? (
    <AuthenticatedUserDropdown renderLogout={() => <LogOut />} />
  ) : (
    <a href="/login">Log in</a>
  );
};
