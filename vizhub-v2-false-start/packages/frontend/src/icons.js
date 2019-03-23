import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  fill: ${props => props.fill || props.theme.textLight};
`;

// Derived from Material Design fullscreen icon.
export const FullScreenSVG = () => (
  <SVG viewBox="0 0 18 18">
    <path d="M 2.25,12 H 0 v 6 H 6.0000001 V 15.75 H 2.25 Z M 0,6 H 2.25 V 2.25 H 6.0000001 V 0 H 0 Z m 15.75,9.75 H 12 V 18 h 6 V 12 H 15.75 Z M 12,0 v 2.25 h 3.75 V 6 H 18 V 0 Z" />
  </SVG>
);

// Derived from Octicons repo-forked icon.
// Original viewBox="0 0 10 16"
// viewBox modified to achieve consistent aspect ratio across icons.
export const ForkSVG = () => (
  <SVG viewBox="-3 0 16 16">
    <path d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" />
  </SVG>
);

// Derived from Octicons pencil icon.
// Original viewBox="0 0 14 16"
// viewBox modified to achieve consistent aspect ratio across icons.
export const EditSVG = () => (
  <SVG viewBox="-1 0 16 16">
    <path d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z" />
  </SVG>
);

// Derived from Octicons thumbsup icon.
export const UpvoteSVG = () => (
  <SVG viewBox="0 0 16 16">
    <path d="M13.991 13.991c-.05.69-1.269 1-1.998 1H5.665l-1.669-1V7.995c1.36 0 2.11-.75 3.129-1.879 1.229-1.359 1.139-2.558.879-4.127-.08-.5.5-1 1-1 .829 0 1.998 2.729 1.998 3.998l-.02 1.03c0 .689.33.969 1.02.969H14c.63 0 .98.36 1 .999l-1 5.996-.01.01zm0-7.995h-2.018l.02-.98C11.992 3.719 10.822 0 8.993 0c-.58 0-1.169.3-1.559.77-.36.41-.5.909-.42 1.409.25 1.479.28 2.278-.629 3.278-1 1.089-1.48 1.549-2.389 1.549H2c-1.061-.01-2 .929-2 1.988v3.998c0 1.06.94 1.999 1.999 1.999h1.719l1.439.86c.16.089.33.139.52.139h6.325c1.13 0 2.839-.5 2.999-1.879l.979-5.946c.02-.08.02-.14.02-.2-.03-1.17-.84-1.969-1.999-1.969h-.01z" />
  </SVG>
);

// Derived from Octicons thumbsdown icon.
export const DownvoteSVG = () => (
  <SVG viewBox="0 0 16 16">
    <path d="M15.97 7.825L15 1.88C14.83.499 13.123 0 11.993 0H5.686c-.2 0-.38.05-.53.14L3.719 1h-1.72C.94 1 0 1.938 0 2.997v3.998c0 1.059.94 2.018 1.999 1.998h1.998c.91 0 1.39.45 2.389 1.55.91.999.88 1.798.63 3.267-.08.5.06 1 .42 1.42.39.47.979.769 1.558.769 1.83 0 2.998-3.718 2.998-5.017l-.02-.98h2.04c1.159 0 1.948-.799 1.978-1.968 0-.06.02-.13-.02-.2v-.01zm-1.969 1.19h-1.989c-.7 0-1.029.28-1.029.969l.03 1.03c0 1.268-1.17 3.997-1.999 3.997-.5 0-1.079-.5-.999-1 .25-1.579.34-2.778-.89-4.137-1.019-1.13-1.768-1.879-3.127-1.879V1.999l1.668-1h6.326c.73 0 1.95.31 2 1l.02.02.999 5.996c-.03.64-.38 1-1 1h-.01z" />
  </SVG>
);

// Derived from Material Design forward-arrow icon.
export const ShareSVG = () => (
  <SVG viewBox="0 0 459 459">
    <path d="M459,216.75L280.5,38.25v102c-178.5,25.5-255,153-280.5,280.5C63.75,331.5,153,290.7,280.5,290.7v104.55L459,216.75z" />
  </SVG>
);

// Derived from Material Design download-button icon.
export const DownloadSVG = () => (
  <SVG viewBox="0 0 433.5 433.5">
    <path d="M395.25,153h-102V0h-153v153h-102l178.5,178.5L395.25,153z M38.25,382.5v51h357v-51H38.25z" />
  </SVG>
);

//// Derived from Material Design close icon.
//export const CloseSVG = () => (
//  <SVG viewBox="0 0 48 48">
//    <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
//  </SVG>
//);

// Derived from Material Design arrow-back icon.
export const ArrowBackSVG = props => (
  <SVG viewBox="0 0 24 24" {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </SVG>
);

const arrowProtrusion = 4;
const arrowRightPath = [
  'M',
  10 - arrowProtrusion / 2,
  ' 17l',
  5 + arrowProtrusion,
  '-5-',
  5 + arrowProtrusion,
  '-5v10z'
].join('');

const arrowDownPath = [
  'M7 ',
  10 - arrowProtrusion / 2,
  'l5 ',
  5 + arrowProtrusion,
  ' 5-',
  5 + arrowProtrusion,
  'z'
].join('');

// Derived from Material Design arrow-right icon.
// Modified viewBox.
export const ArrowRightSVG = props => (
  <SVG viewBox="4 4 16 16" {...props}>
    <path d={arrowRightPath} />
  </SVG>
);

// Derived from Material Design arrow-drop-down icon.
// Modified viewBox.
export const ArrowDownSVG = props => (
  <SVG viewBox="4 4 16 16" {...props}>
    <path d={arrowDownPath} />
  </SVG>
);

// Derived from Material Design radio-button-* icons.
const radioChecked =
  'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';
const radioUnchecked =
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';
export const RadioButtonSVG = props => (
  <SVG viewBox="0 0 24 24" {...props}>
    <path d={props.checked ? radioChecked : radioUnchecked} />
  </SVG>
);

// Derived from Material Design check-box-* icons.
const checked =
  'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z';
// filled const checked = 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
const unchecked =
  'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z';
export const CheckBoxSVG = props => (
  <SVG viewBox="0 0 24 24" {...props}>
    <path d={props.checked ? checked : unchecked} />
  </SVG>
);
