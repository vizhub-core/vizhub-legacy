import { constants } from 'fs';
import * as AdmZip from 'adm-zip';
import { Visualization } from 'datavis-tech-entities';

export const zipVisualization = (visualization: Visualization) => {
  const zip = new AdmZip();

  visualization.content.files.forEach(file => {
    zip.addFile(file.name, Buffer.alloc(file.text.length, file.text));
  });

  const zipFileBuffer = zip.toBuffer();
  const zipFileName = visualization.info.title + '.zip';
  return { zipFileBuffer, zipFileName };
}
