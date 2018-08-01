const stripExtension = fileName => fileName.substr(0, fileName.lastIndexOf('.'));
const capitalize = name => name.charAt(0).toUpperCase() + name.substr(1);
export const suggestedName = fileName => capitalize(stripExtension(fileName));
