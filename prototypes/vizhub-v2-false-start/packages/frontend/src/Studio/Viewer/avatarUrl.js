// TODO make this an accessor for user entity
export const avatarUrl = ({ gitHubId }, height) =>
  `https://avatars0.githubusercontent.com/u/${gitHubId}?s=${height * 2}&v=4`;
