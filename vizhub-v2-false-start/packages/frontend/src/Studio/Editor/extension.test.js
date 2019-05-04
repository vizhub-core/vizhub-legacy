import { extension } from './extension';

describe('extension', () => {
  it('computes extension for js, html and css files', () => {
    expect(extension('index.js')).toEqual('js');
    expect(extension('index.html')).toEqual('html');
    expect(extension('index.css')).toEqual('css');
  });

  it('handles dot and slash characters', () => {
    expect(extension('./index.js')).toEqual('js');
    expect(extension('./styles/theme.css')).toEqual('css');
  });

  it('returns falsy if no extension detected', () => {
    expect(extension('index')).toBeFalsy();
  });
});
