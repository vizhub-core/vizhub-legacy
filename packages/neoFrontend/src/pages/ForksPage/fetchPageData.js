export const fetchPageData = async (vizId, offset) => {
  const url = `/api/visualization/get/${vizId}/forks?offset=${offset}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  });
  return await response.json();
};
