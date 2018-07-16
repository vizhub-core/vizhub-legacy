export const hasName = name => file => file.name === name
export const findFile = (name, files) => files.filter(hasName(name))[0];
