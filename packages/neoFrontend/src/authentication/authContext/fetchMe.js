export const fetchMe = () =>
  fetch('/api/auth/me', { method: 'GET', credentials: 'same-origin' }).then(
    response => response.json()
  );
