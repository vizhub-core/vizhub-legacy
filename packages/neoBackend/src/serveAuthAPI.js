import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
// TODO uppercase.
import { errorResponse } from './errorResponse';

const oAuthAccessTokenURL = 'https://github.com/login/oauth/access_token';
const client_id = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
const client_secret = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_SECRET;

export const serveAuthAPI = app => {
  app.post('/api/auth/github', (req, res) => {
    const { code } = req.body;

    // Assemble options for fetch request.
    const fetchOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ client_id, client_secret, code })
    };

    // Get an access token from GitHub's API.
    const accessToken = fetch(oAuthAccessTokenURL, fetchOptions)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          return Promise.reject(
            errorResponse({
              error: data.error,
              errorDescription: data.error_description,
              errorURL: data.error_uri
            })
          );
        }
        return data.access_token;
      });

    accessToken
      .catch(errorResponse => res.send(errorResponse))
      .then(token => {
        console.log(token);
        res.send({ token });
      });

    //        // set token in header for fetching user
    //        // api for getting profile data
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
  });
};
