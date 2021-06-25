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

const renderPage = ({ title, page, pageProps }) => {
  const rootHTML = renderToString(<App page={page} />);
  return indexHTML({ title, page, pageProps, rootHTML });
};

app.get('/', async (req, res) => {
  // TODO support sort options from ~/repos/vizhub/packages/entities/src/visualizationInfo.js
  const vizInfos = await getVizInfos({
    sortField: 'scoreHackerHotLastUpdated',
  });
  console.log(vizInfos);
  const { title, page, pageProps } = homePagePresenter({ vizInfos });
  res.send(renderPage({ title, page, pageProps }));
});

app.use(express.static('public'));

app.get('/:userName/:vizId', async (req, res) => {
  const { userName, vizId } = req.params;

  const vizInfo = await getVizInfo(vizId);

  if (!vizInfo) {
    const title = 'Viz not found';
    const page = 'VizNotFoundPage';
    res.send(renderPage({ title, page }));
    return;
  }

  // TODO handle case of missing viz by rendering error page VizNotFoundPage.

  const { title, page, pageProps } = vizPagePresenter({ vizInfo });
  res.send(renderPage({ title, page, pageProps }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
