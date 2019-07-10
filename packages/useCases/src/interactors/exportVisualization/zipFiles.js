import AdmZip from 'adm-zip';

export const zipFiles = files => {
  const zip = new AdmZip();
  files.forEach(file => {
    zip.addFile(file.name, Buffer.alloc(file.text.length, file.text));
  });
  return zip.toBuffer();
};
