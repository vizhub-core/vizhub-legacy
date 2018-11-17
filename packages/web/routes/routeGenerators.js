export const absolute = relative => 'https://vizhub.com' + relative;

export const thumbnailUrl = id => `/api/visualization/thumbnail/${id}.png`;
export const previewUrl = id => `/api/visualization/preview/${id}.png`;

export const profileRoute = ({userName}) =>
  `/${userName}`;

export const visualizationRoute = ({userName, id}) =>
  `/${userName}/${id}`;

export const datasetRoute = ({userName, slug}) =>
  `/${userName}/datasets/${slug}`;

export const datasetUrl = ({userName, slug}) =>
  `https://vizhub.com${datasetRoute({userName, slug})}`;

export const datasetDownloadUrl = ({userName, slug, format, baseUrl}) =>
  `${baseUrl}${datasetRoute({userName, slug})}.${format}`;
