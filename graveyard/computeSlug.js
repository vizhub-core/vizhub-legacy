const slugFromTitle = title => title.toLowerCase().replace(/ /g, '-');

const computeSlug = data => data.slug
  ? data.slug
  : data.title
    ? slugFromTitle(data.title)
    : undefined;
