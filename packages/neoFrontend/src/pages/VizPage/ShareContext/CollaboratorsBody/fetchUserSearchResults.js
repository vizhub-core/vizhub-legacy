export const fetchUserSearchResults = async (query, offset = 0) => {
  const url = `/api/user/search?query=${query}&offset=${offset}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin'
  });
  return await response.json();
};
