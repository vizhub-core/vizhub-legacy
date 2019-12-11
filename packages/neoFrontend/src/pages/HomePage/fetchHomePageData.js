export const fetchHomePageData = async userName => {
  const url = `/api/visualization/metadata/`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin'
  });
  return await response.json();
};
