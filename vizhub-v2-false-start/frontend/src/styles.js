import styled, { createGlobalStyle } from 'styled-components';

// The monospace font used for code, 'Ubuntu Mono Ligaturized',
// a mashup of Ubuntu Mono with the fat arrow ligature from FiraCode
// created using https://github.com/ToxicFrog/Ligaturizer/
//
//  * The file ligatures.py was modified to only include the arrow ligature.
//  * The file ligaturize.py was modified to correct for vertical alignment
//    by adding the following to line 126 (inside correct_ligature_width):
//    glyph.transform(psMat.translate(0, -48))
//    This makes the ligatures align with existing characters (e.g. '=').
export const mono = {
  family: 'Ubuntu Mono Arrowized',
  url: '/fonts/UbuntuMonoArrowized.ttf',
  format: 'truetype',
  lineHeight: '1.1',
  size: '18pt'
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: '${mono.family}';
    src: url('${mono.url}') format('${mono.format}');
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const AppWrapper = styled(Flex)`
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
