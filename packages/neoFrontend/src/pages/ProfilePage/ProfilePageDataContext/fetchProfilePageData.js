import { omitUndefined } from '../../../utils/object';

export const fetchProfilePageData = async ({
  userName,
  query,
  sort,
  section,
}) => {
  const urlSearchParamsString = new URLSearchParams(
    omitUndefined({ query, sort, section })
  ).toString();

  const url = `/api/user/getProfileData/${userName}${
    urlSearchParamsString && `?${urlSearchParamsString}`
  }`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  });
  return await response.json();
};
