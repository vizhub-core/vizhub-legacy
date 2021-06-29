export const homePagePresenter = ({ vizInfos, ownerUsers }) => ({
  title: 'Home',
  page: 'HomePage',
  pageProps: {
    vizInfos,
    ownerUsersMap: new Map(ownerUsers.map((user) => [user.id, user])),
  },
});
