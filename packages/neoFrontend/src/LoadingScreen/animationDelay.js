// The time in ms before kicking off the loading screen.
// If the data request finishes before this time,
// the loading screen will never appear.
export const blankScreenDelay = 200;

// The minimum time in ms to keep the loading screen visible,
// in the case that loading the data takes longer than
// blankScreenDelay.
export const animationDelay = 1000;
