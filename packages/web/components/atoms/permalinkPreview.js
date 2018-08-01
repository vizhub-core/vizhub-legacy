import { datasetUrl } from '../../routes/routeGenerators';

export const PermalinkPreview = ({userName, slug}) => (
  <div>
    Permalink: <a href='#'>{datasetUrl({userName, slug})}</a>
  </div>
);
