export const getJSON = async (relativeUrl, req) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const url = baseUrl + relativeUrl;
  return await (await fetch(url)).json();
}
