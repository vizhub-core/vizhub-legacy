import prettier from 'prettier/standalone';
import parserBabylon from 'prettier/parser-babylon';
import parserHTML from 'prettier/parser-html';
import parserCSS from 'prettier/parser-postcss';
import parserMD from 'prettier/parser-markdown';

export const plugins = [parserBabylon, parserHTML, parserCSS, parserMD];

export { prettier };
