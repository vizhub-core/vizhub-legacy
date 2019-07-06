export const fetchMe = async () => {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'same-origin'
  });
  return await response.json();
};
