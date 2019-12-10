export const fetchFork = async visualization => {
  // TODO include pre-fork changes to files.
  // TODO add test for this case.
  // const visualization = Object.assign(
  //   {},
  //   getVisualization(state),
  //   { files: getFiles(state) }
  // );

  const response = await fetch(`/api/visualization/fork`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      visualization
    })
  });

  return await response.json();
};
