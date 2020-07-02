export const fetchProfilePageData = async (userName, query) => {
  const queryParamsUrlPart = query ? `?query=${query}` : '';
  const url = `/api/user/getProfileData/${userName}${queryParamsUrlPart}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  });
  return await response.json();
};
