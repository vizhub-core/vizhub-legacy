const strings = {
  errorNoOwner: {
    en: 'No owner specified, cannot create document.'
  },
  errorNoId: {
    en: 'No id specified, cannot get document.'
  },
  errorDocNotFound: {
    en: 'The requested document does not exist'
  },
  errorNotOwnerCantSave: {
    en: 'You must be the owner of the document in order to save it.'
  }
};

export const defaultLocale = 'en';

export const i18n = (name, locale = defaultLocale) => strings[name][locale];
