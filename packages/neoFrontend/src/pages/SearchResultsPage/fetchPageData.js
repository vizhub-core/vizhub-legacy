export const fetchPageData = async (query, offset) => {
  const url = `/api/visualization/search?query=${query}&offset=${offset}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  });
  return await response.json();
};
