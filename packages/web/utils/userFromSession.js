import { User } from 'datavis-tech-entities'

// Creates a User entity from the Express session.
export const userFromSession = session => (
  session.user
    ? new User({
      authenticated: true,
      id: session.user.gitHubId,
      userName: session.user.username,
      fullName: session.user.name,
      email: session.user.email
    })
    : new User({ authenticated: false })
)
