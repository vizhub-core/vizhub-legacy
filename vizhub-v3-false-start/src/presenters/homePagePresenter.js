export const homePagePresenter = ({ vizInfos, ownerUsers }) => ({
  title: 'Home',
  page: 'HomePage',
  pageProps: {
    vizInfos,
    ownerUsersById: ownerUsers.reduce((accumulator, user) => {
      accumulator[user.id] = user;
      return accumulator;
    }, {}),
  },
  // TODO add meta tag info
});
