import express from 'express';
import React from 'react';
import marked from 'marked';
import { renderToString } from 'react-dom/server';
import { indexHTML } from '../indexHTML';
import { App } from '../App';
import { getVizInfo } from './database';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send(indexHTML('Home Page', renderToString(<App page="HomePage" />)));
});

app.use(express.static('public'));

app.get('/:userName/:vizId', async (req, res) => {
  const { userName, vizId } = req.params;

  const vizInfo = await getVizInfo(vizId);

  // TODO handle case of missing viz by rendering error page VizNotFoundPage.
  const { title, description } = vizInfo;

  const page = 'VizPage';
  // TODO sanitize this
  const sanitizedDescriptionHTML = marked(description);
  const pageProps = { title, sanitizedDescriptionHTML };

  res.send(
    indexHTML({
      title,
      rootHTML: renderToString(<App page={page} pageProps={pageProps} />),
      page,
      pageProps,
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
