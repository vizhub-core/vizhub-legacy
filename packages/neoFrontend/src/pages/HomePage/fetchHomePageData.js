export const fetchHomePageData = async ({ offset, sort }) => {
  const url = `/api/visualization/home?offset=${offset}&sort=${sort}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  });
  return await response.json();
};
