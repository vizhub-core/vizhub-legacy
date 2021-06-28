import express from 'express';
//import React from 'react';
import { getVizInfo, getVizInfos } from './database';
import { vizPagePresenter } from '../presenters/vizPagePresenter';
import { homePagePresenter } from '../presenters/homePagePresenter';
import { renderPage } from './renderPage';

const app = express();
const port = 8080;

app.get('/', async (req, res) => {
  // TODO support sort options from ~/repos/vizhub/packages/entities/src/visualizationInfo.js
  const vizInfos = await getVizInfos({
    sortField: 'scoreHackerHotLastUpdated',
  });

  res.send(renderPage(homePagePresenter({ vizInfos })));
});

app.get('/sanitycheck', async (req, res) => {
  res.send(renderPage({ title: 'Sanity check', page: 'SanityCheckPage' }));
});

app.use(express.static('public'));

app.get('/:userName/:vizId', async (req, res) => {
  const { userName, vizId } = req.params;

  const vizInfo = await getVizInfo(vizId);

  if (!vizInfo) {
    res.send(renderPage({ title: 'Viz not found', page: 'VizNotFoundPage' }));
    return;
  }

  res.send(renderPage(vizPagePresenter({ vizInfo })));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
