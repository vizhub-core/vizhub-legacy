import { constants } from 'fs';
import * as AdmZip from 'adm-zip';
import { File } from 'vizhub-entities';

export const zipFiles = (files: File[]) => {
  const zip = new AdmZip();
  files.forEach(file => {
    zip.addFile(file.name, Buffer.alloc(file.text.length, file.text));
  });
  return zip.toBuffer();
}
