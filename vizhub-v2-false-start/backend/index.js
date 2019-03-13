import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get('/api/get/data', (re, res) => {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlkIjoiZGF0YS5pZCIsImlhdCI6MTU1MTI4NTE2NSwiZXhwIjoxNTUxMzcxNTY1fQ.e-0SBtbKYz5K7QAK9hDtfg0QFgf8cqsF365lco_0sm8';
  let details = jwt.verify(token, process.env.SECERT, {
    ignoreExpiration: true
  });

  res.json({
    data: details
  });
});

app.get('/api/me', verifyToken, (req, res) => {
  // decode jwt to get data from it
  const details = jwt.verify(req.token, process.env.SECERT, {
    ignoreExpiration: true
  });

  // TODO return data about the currently authenticated user.
  res.json({
    authenticated: true,
    id: details.id,
    username: details.user
  });
});

// api to create github token
app.post('/api/github/token', cors(), (req, res, next) => {
  // getting code from callback
  const code = req.body.code;

  // setting data for sending to github
  const data = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code: code
  };

  // api calling for fetching github user profile
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // store token in variaable
      const accessToken = data.access_token;

      // set token in header for fetching user
      // api for getting profile data
      return fetch('https://api.github.com/user', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `token ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          // storing user profile for creating access token
          const user = {
            user: data.login,
            id: data.id
          };

          // generating jwt token with expired in 24 hour and sending to front
          jwt.sign(
            user,
            process.env.SECERT,
            { expiresIn: 60 * 60 * 24 },
            (err, token) => {
              res.json({
                token
              });
              console.log('l' + token);
            }
          );
        });
    })
    .catch(error => {
      // sending error if it occurs
      res.send(error);
    });
});

// verifying token
function verifyToken(req, res, next) {
  // getting auth header
  const bearerHeader = req.headers['authorization'];

  //check if token is there or not
  if (bearerHeader) {
    //split at the space
    const bearer = bearerHeader.split(' ');
    // get token from splited array
    const bearerToken = bearer[1];
    console.log(bearerToken);
    // set token
    req.token = bearerToken;

    if (bearerToken === 'null') {
      res.json({
        authenticated: false
      });
    } else {
      // proceed next
      next();
    }
  } else {
    // res.status(401).send('User not authenticated!');
    res.json({
      authenticated: false
    });
  }
}

app.listen(4000);
