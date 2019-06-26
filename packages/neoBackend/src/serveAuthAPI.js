import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import cors from 'cors';
import { errorResponse } from './errorResponse';

export const serveAuthAPI = app => {
  app.post('/api/auth/github', cors(), (req, res) => {
    const body = JSON.stringify({
      client_id: process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID,
      client_secret: process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_SECRET,
      code: req.body.code
    });

    console.log('here');
    console.log(body);

    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          return res.send(
            errorResponse({
              error: data.error,
              errorDescription: data.error_description,
              errorURL: data.error_uri
            })
          );
        }
        console.log(data);
        // // store token in variaable
        // const accessToken = data.access_token;

        // // set token in header for fetching user
        // // api for getting profile data
        // return fetch('https://api.github.com/user', {
        //   method: 'GET',
        //   mode: 'cors',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     Authorization: `token ${accessToken}`,
        //   },
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     // storing user profile for creating access token
        //     const user = {
        //       user: data.login,
        //       id: data.id,
        //     };

        //     // generating jwt token with expired in 24 hour and sending to front
        //     jwt.sign(
        //       user,
        //       process.env.JWT_SECRET,
        //       {expiresIn: 60 * 60 * 24},
        //       (err, token) => {
        //         res.json({
        //           token,
        //         });
        //         console.log('l' + token);
        //       },
        //     );
        //   });
      })
      .catch(error => {
        console.log(error);
      });
  });
};
