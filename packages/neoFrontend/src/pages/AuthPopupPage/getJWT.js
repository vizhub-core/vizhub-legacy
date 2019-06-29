export const getJWT = async code => {
  const response = await fetch('/api/auth/github', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  });
  return await response.json();
};
