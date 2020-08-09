const omitUndefined = (object) => {
  return Object.keys(object).reduce((refinedObject, key) => {
    if (object[key] !== undefined) {
      refinedObject[key] = object[key];
    }

    return refinedObject;
  }, {});
};

export const fetchProfilePageData = async ({ userName, query, sort, offset }) => {
  const urlSearchParamsString = new URLSearchParams(
    omitUndefined({ query, sort, offset })
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
