import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { indexHTML } from '../indexHTML';
import { App } from '../App';
import { getViz } from './getViz';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send(indexHTML('Home Page', renderToString(<App page="HomePage" />)));
});

app.use(express.static('public'));

app.get('/:userName/:vizId', async (req, res) => {
  const { userName, vizId } = req.params;
  const viz = await getViz(vizId);

  const page = 'VizPage';
  const pageProps = { viz };

  res.send(
    indexHTML({
      title: 'Viz page',
      rootHTML: renderToString(<App page={page} pageProps={pageProps} />),
      page,
      pageProps,
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
