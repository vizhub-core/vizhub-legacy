export const baseUrl = req =>
  req ? `${req.protocol}://${req.get('Host')}` : '';
