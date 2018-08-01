export const visualizationRoute = ({userName, id}) =>
  `/${userName}/${id}`;

export const datasetRoute = ({userName, slug}) =>
  `/${userName}/datasets/${slug}`;
