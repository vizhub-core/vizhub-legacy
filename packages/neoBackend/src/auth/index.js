import { authGitHub, authMe, authSignOut } from './routes';

export const auth = (app, userGateway) => {
  app.post('/api/auth/github', authGitHub(userGateway));
  app.get('/api/auth/me', authMe(userGateway));
  app.get('/api/auth/signOut', authSignOut);
};

//        return fetch('https://api.github.com/user', {
//          method: 'GET',
//          mode: 'cors',
//          headers: {
//            Accept: 'application/json',
//            'Content-Type': 'application/json',
//            Authorization: `token ${accessToken}`,
//          },
//        })
//          .then(response => response.json())
//          .then(data => {
//            console.log(data);
//            // storing user profile for creating access token
//            const user = {
//              user: data.login,
//              id: data.id,
//            };
//
//            // generating jwt token with expired in 24 hour and sending to front
//            jwt.sign(
//              user,
//              process.env.JWT_SECRET,
//              {expiresIn: 60 * 60 * 24},
//              (err, token) => {
//                res.json({
//                  token,
//                });
//                console.log('l' + token);
//              },
//            );
//          });
//      .catch(error => {
//        console.log(error);
//      });
//      })
