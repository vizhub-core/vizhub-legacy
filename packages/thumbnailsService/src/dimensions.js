const defaultWidth = 960;
const defaultHeight = 500;
const aspectRatio = defaultWidth / defaultHeight;

const dimensions = width => ({
  width,
  height: Math.round(width/ aspectRatio)
});

export const thumbnailDimensions = dimensions(230);
export const previewDimensions = dimensions(960);
