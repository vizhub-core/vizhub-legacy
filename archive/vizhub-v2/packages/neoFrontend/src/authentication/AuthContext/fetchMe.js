export const fetchMe = async () => {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'same-origin',
  });
  const data = await response.json();
  return data.me;
};
