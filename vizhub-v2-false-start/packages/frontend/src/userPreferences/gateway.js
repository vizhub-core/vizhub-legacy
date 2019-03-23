import EventEmitter from 'events';

export const preferencesGateway = async () => {
  const data = {
    colorTheme: 'ubuntu'
  };
  const preferences = new EventEmitter();
  preferences.get = key => preferences[key];
  preferences.set = (key, value) => {
    data[key] = value;
    preferences.emit('change', key);
  };
  return preferences;
};
