import path from 'path';
import fs from 'fs';

const indexHTMLPath = path.join(__dirname, '..', 'build', 'index.html');
const indexHTML = fs.readFileSync(indexHTMLPath, 'utf8');

export const serveVizPage = (req, res) => {
  console.log('Serving a Viz page');
  // TODO fetch viz data here
  // generate unfurl tags from it
  // embed the escaped data into the page
  // find and parse that data in client-side code
  console.log(req.params.vizId);
  console.log(indexHTML);
  res.send(indexHTML);
};
