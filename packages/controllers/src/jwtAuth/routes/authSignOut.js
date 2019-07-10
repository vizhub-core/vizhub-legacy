export const authSignOut = (req, res) => {
  res.clearCookie('vizHubJWT');
  res.send({});
};
