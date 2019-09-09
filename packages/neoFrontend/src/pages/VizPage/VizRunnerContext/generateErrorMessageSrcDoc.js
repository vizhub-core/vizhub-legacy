import { defaultCodingFontFamily } from '../../../theme';

export const generateErrorMessageSrcDoc = (errorMessage, includeBundleNote) => `
  <html>
    <style>
      body {
        padding: 10px;
      }
      pre {
        font-family: ${defaultCodingFontFamily};
        font-size: 1.3em;
        border-radius: 0.25rem;
        background-color: rgba(206, 17, 38, 0.05);
        padding: 10px;
        color: rgb(41, 50, 56);
        line-height: 1.4;
      }
      .title {
        color: rgb(206, 17, 38);
        font-size: 2em;
        font-family: sans-serif;
      }
      .subtle {
        font-family: sans-serif;
        color: rgb(135, 142, 145);
        margin-top: 0.5rem;
      }
    </style>
    <body>
      <div class="title">Failed to compile</div>
      <pre>${errorMessage}</pre>
      ${
        includeBundleNote
          ? '<div class="subtle">bundle.js not updated.</div>'
          : ''
      }
    </body>
  </html>
`;
