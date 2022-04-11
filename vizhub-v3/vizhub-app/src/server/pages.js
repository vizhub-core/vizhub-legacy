import React from 'react';
import { renderToString } from 'react-dom/server';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { GetVizSnapshot } from 'vizhub-interactors';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
  VIZ_INFO_NOT_FOUND,
} from 'vizhub-interactors/constants';
import {
  HomePagePresenter,
  VizPagePresenter,
  LoginPagePresenter,
  //  ProfilePagePresenter,
} from '../presenters';
import { App } from '../App';
import { homePageVizInfosQuery } from '../HomePage';
import { html } from './html';

export const pages = ({ app, gateways, shareDBConnection }) => {
  const getVizSnapshot = GetVizSnapshot(gateways);

  // Serve the viz page.
  app.get('/:userName/:vizId', async (req, res) => {
    // TODO if viz owner does not match userName,
    // redirect to the correct username.

    try {
      const { vizId } = req.params;
      const vizSnapshot = await getVizSnapshot(vizId);
      const pageData = {
        pageName: VizPagePresenter.name,
        vizSnapshot: await getVizSnapshot(vizId),
        authenticatedUser: req.user,
      };
      const rootHTML = renderToString(
        <SSRProvider>
          <App pageData={pageData} />
        </SSRProvider>
      );
      const title = 'VizHub Community Edition';
      res.send(html({ title, rootHTML, pageData }));
    } catch (error) {
      if (error.code === VIZ_INFO_NOT_FOUND) {
        // TODO custom 404 page
        res.status(404).send('Viz not found!');
      } else {
        // TODO custom 500 page
        throw error;
        res.status(500).send(error.message + '\n' + error.code);
      }
    }
  });

  // Serve the home page.
  app.get('/', async (req, res) => {
    const vizInfoSnapshots = await new Promise((resolve, reject) => {
      const query = shareDBConnection.createFetchQuery(
        VIZ_INFO_COLLECTION,
        homePageVizInfosQuery(),
        {},
        (error, results) => {
          // TODO verify that error handling works.
          if (error) {
            reject(error);
          } else {
            // results is an array of Doc instances with their data populated
            resolve(results.map((doc) => doc.toSnapshot()));
            query.destroy();
          }
        }
      );
    });

    const pageData = {
      pageName: HomePagePresenter.name,
      vizInfoSnapshots,
      authenticatedUser: req.user,
    };
    const rootHTML = renderToString(
      <SSRProvider>
        <App pageData={pageData} />
      </SSRProvider>
    );
    const title = 'VizHub Community Edition';
    res.send(html({ title, rootHTML, pageData }));
  });

  app.get('/login', (req, res, next) => {
    // TODO refactor this duplicated logic
    // TODO styled ui for this page
    const pageData = {
      pageName: LoginPagePresenter.name,
      authenticatedUser: req.user,
    };
    const rootHTML = renderToString(
      <SSRProvider>
        <App pageData={pageData} />
      </SSRProvider>
    );
    const title = 'Log in';
    res.send(html({ title, rootHTML, pageData }));
  });
};

// TODO Profile Page
