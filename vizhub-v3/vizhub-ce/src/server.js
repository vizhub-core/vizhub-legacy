// Inspired by https://github.com/curran/sharedb-racer-react-demo/blob/main/src/server.js
import express from 'express';
import http from 'http';

const port = 8080;

const app = express();

app.get('/', (req, res) => {
    res.send('VizHub Community Edition');
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`VizHub listening at http://localhost:${port}`);
});
