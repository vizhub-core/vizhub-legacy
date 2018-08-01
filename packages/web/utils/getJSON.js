import { baseUrl } from './baseUrl';

export const getJSON = async (relativeUrl, req) => {
  const url = baseUrl(req) + relativeUrl;
  return await (await fetch(url)).json();
}
