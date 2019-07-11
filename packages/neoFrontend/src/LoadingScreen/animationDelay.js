// Don't show the animation in development, as it slows down iterations and tests.
export const animationDelay = process.env.NODE_ENV === 'development' ? 0 : 1000;
