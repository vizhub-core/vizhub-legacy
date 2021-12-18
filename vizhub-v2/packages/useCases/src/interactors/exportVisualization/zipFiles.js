import AdmZip from 'adm-zip';

export const zipFiles = (files) => {
  const zip = new AdmZip();
  files.forEach((file) => {
    // Defend against potential freakish null or undefined values.
    const text = file.text || '';

    zip.addFile(file.name, Buffer.alloc(text.length, text));
  });
  return zip.toBuffer();
};
