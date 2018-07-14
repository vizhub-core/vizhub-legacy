const strings = {
  errorNoOwner: {
    en: 'No owner specified, cannot create document.'
  },
  errorNoId: {
    en: 'No id specified, cannot get document.'
  },
  errorDocNotFound: {
    en: 'The requested document does not exist'
  }
};

export const defaultLocale = 'en';

export const i18n = (name, locale = defaultLocale) => strings[name][locale];
