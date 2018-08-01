export const PermalinkPreview = ({userName, slug}) => (
  <div>
    Permalink: <a href='#'>{`https://vizhub.com/${userName}/datasets/${slug}`}</a>
  </div>
);
