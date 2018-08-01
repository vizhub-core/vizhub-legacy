export const visualizationRoute = ({userName, id}) =>
  `/${userName}/${id}`;

export const datasetRoute = ({userName, slug}) =>
  `/${userName}/datasets/${slug}`;

export const datasetUrl = ({userName, slug}) =>
  `https://vizhub.com${datasetRoute({userName, slug})}`;

export const datasetDownloadUrl = ({userName, slug, format}) =>
  `https://vizhub.com${datasetRoute({userName, slug})}.${format}`;
