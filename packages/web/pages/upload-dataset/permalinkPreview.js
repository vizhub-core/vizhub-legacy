import { datasetRoute } from '../../routes/routeGenerators';

const datasetPermalink = ({userName, slug}) =>
  `https://vizhub.com${datasetRoute({userName, slug})}`;

export const PermalinkPreview = ({userName, slug}) => (
  <div>
    Permalink: <a href='#'>{datasetPermalink({userName, slug})}</a>
  </div>
);
