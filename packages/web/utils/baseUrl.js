export const baseUrl = req =>
  (req ? `${req.protocol}://${req.get('Host')}` : '')
  .replace('http://vizhub.com', 'https://vizhub.com');
