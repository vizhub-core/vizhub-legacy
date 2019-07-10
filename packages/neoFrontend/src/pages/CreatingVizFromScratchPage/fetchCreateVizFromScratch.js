export const fetchCreateVizFromScratch = async () => {
  const response = await fetch('/api/visualization/create', {
    credentials: 'include'
  });
  return await response.json();
};
