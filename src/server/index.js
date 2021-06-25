import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { indexHTML } from '../indexHTML';
import { App } from '../App';
import { getVizInfo, getVizInfos } from './database';
import { vizPagePresenter } from '../presenters/vizPagePresenter';
import { homePagePresenter } from '../presenters/homePagePresenter';

const app = express();
const port = 8080;

app.get('/', async (req, res) => {
  // TODO support sort options from ~/repos/vizhub/packages/entities/src/visualizationInfo.js
  const vizInfos = await getVizInfos({
    sortField: 'scoreHackerHotLastUpdated',
  });
  console.log(vizInfos);
  const { title, page, pageProps } = homePagePresenter(vizInfos);
  const rootHTML = renderToString(<App page={page} pageProps={pageProps} />);
  res.send(indexHTML({ title, page, pageProps, rootHTML }));
});

app.use(express.static('public'));

app.get('/:userName/:vizId', async (req, res) => {
  const { userName, vizId } = req.params;

  const vizInfo = await getVizInfo(vizId);

  // TODO handle case of missing viz by rendering error page VizNotFoundPage.

  const { title, page, pageProps } = vizPagePresenter({ vizInfo });
  const rootHTML = renderToString(<App page={page} pageProps={pageProps} />);
  res.send(indexHTML({ title, page, pageProps, rootHTML }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
