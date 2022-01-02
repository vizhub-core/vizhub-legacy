// Inspired by archive/vizhub-v3-false-start/src/server/index.js

import express from 'express';
import { Octokit } from 'octokit';

//const octokit = new Octokit({ auth: `personal-access-token123` });
const octokit = new Octokit();

const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/:username/:vizId', async (req, res) => {
  const { username, vizId } = req.params;
  console.log(username, vizId);
});

app.get('/:username', async (req, res) => {
  const { username } = req.params;
  const result = await octokit.request('GET /users/{username}/gists', {
    username,
  });
  console.log(result);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
