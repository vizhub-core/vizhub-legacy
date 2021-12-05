export const fetchDeleteViz = async (visualization) => {
  const response = await fetch(`/api/visualization/delete`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: visualization.info.id,
    }),
  });

  return await response.json();
};
