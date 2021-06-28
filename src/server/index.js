import express from 'express';
import * as database from './database';
import { getHomePageData } from '../interactors/getHomePageData';
import { getVizPageData } from '../interactors/getVizPageData';
import { vizPagePresenter } from '../presenters/vizPagePresenter';
import { homePagePresenter } from '../presenters/homePagePresenter';
import { renderPage } from './renderPage';

const app = express();
const port = 8080;

app.get('/', async (req, res) => {
  res.send(renderPage(homePagePresenter(await getHomePageData(database))));
});

app.get('/sanitycheck', async (req, res) => {
  res.send(renderPage({ title: 'Sanity check', page: 'SanityCheckPage' }));
});

app.use(express.static('public'));

app.get('/:userName/:vizId', async (req, res) => {
  const { userName, vizId } = req.params;

  const vizPageData = await getVizPageData(database, vizId);

  // TODO if userName does not match owner username, redirect to correct URL

  if (!vizPageData) {
    res.send(renderPage({ title: 'Viz not found', page: 'VizNotFoundPage' }));
    return;
  }

  res.send(renderPage(vizPagePresenter(vizPageData)));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
