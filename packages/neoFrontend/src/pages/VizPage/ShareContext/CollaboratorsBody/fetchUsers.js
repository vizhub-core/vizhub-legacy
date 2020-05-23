export const fetchUsers = async (userIds) => {
  const url = `/api/user/get?ids=${userIds}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  });
  return await response.json();
};
