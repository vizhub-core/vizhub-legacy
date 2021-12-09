export const fetchVizPageData = async (vizId) => {
  const response = await fetch(`/api/visualization/get/${vizId}`, {
    method: 'GET',
    credentials: 'same-origin',
  });
  return await response.json();
};
