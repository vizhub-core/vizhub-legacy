import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHTML from 'prettier/parser-html';
import parserCSS from 'prettier/parser-postcss';
import parserMD from 'prettier/parser-markdown';

export const plugins = [parserBabel, parserHTML, parserCSS, parserMD];

export { prettier };
