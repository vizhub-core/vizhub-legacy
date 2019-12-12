export const fetchHomePageData = async offset => {
  const url = `/api/visualization/home?offset=${offset}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin'
  });
  return await response.json();
};
