export const fetchProfilePageData = async userName => {
  const url = `/api/user/getProfileData/${userName}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin'
  });
  return await response.json();
};
