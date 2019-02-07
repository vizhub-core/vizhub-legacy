// Shrink and grow to fill available width and height.
export const computeScale = options => {
  const { boundsWidth, boundsHeight, width, height } = options;

  const aspect = width / height;
  const boundsAspect = boundsWidth / boundsHeight;

  return aspect > boundsAspect
    ? boundsWidth / width
    : boundsHeight / height;
};
