// TODO instrument this to log errors to the server, so they can be traced and fixed
export const logShareDBError = (error) => {
  if (error) console.log(error);
};
