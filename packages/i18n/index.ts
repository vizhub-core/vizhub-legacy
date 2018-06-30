const strings = {
  errorNoOwner: {
    en: 'No owner specified, cannot create document.'
  }
};

export const defaultLocale = 'en';

export const i18n = (name, locale = defaultLocale) => strings[name][locale];
