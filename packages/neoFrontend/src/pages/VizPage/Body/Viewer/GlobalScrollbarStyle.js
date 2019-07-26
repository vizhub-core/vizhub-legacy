import { createGlobalStyle } from 'styled-components';

// Derived from node_modules/perfect-scrollbar/css/perfect-scrollbar.css
export const GlobalScrollbarStyle = createGlobalStyle`
  .ps {
    overflow: hidden !important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
  }

  .ps__rail-y {
    display: block;
    opacity: 0;
    transition: opacity .2s linear;
    transition-delay: .2s;
    width: 10px;
    right: 0;
    position: absolute;
  }

  .ps--active-x > .ps__rail-x,
  .ps--active-y > .ps__rail-y {
    background-color: transparent;
  }

  .ps:hover > .ps__rail-x,
  .ps:hover > .ps__rail-y,
  .ps--focus > .ps__rail-x,
  .ps--focus > .ps__rail-y,
  .ps--scrolling-x > .ps__rail-x,
  .ps--scrolling-y > .ps__rail-y {
    opacity: 1;
  }

  .ps .ps__rail-x:hover,
  .ps .ps__rail-y:hover,
  .ps .ps__rail-x:focus,
  .ps .ps__rail-y:focus,
  .ps .ps__rail-x.ps--clicking,
  .ps .ps__rail-y.ps--clicking {
    background-color: transparent;
    opacity: 1;
  }

  .ps__thumb-y {
    background-color: #ffffff;
    box-shadow: ${props => props.theme.shadow};
    border-radius: 10px;
    width: 4px;
    right: 3px;
    transition: ${({ theme: { fastTransition } }) => `
      width ${fastTransition}, right ${fastTransition}
    `};
    position: absolute;
  }

  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    width: 10px;
    right: 0px;
  }

  /* MS supports */
  @supports (-ms-overflow-style: none) {
    .ps {
      overflow: auto !important;
    }
  }

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .ps {
      overflow: auto !important;
    }
  }
`;
