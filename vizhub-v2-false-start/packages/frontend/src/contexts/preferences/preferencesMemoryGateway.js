import EventEmitter from 'events';

export const preferencesMemoryGateway = () => {
  const data = {
    colorTheme: 'ubuntu',
    font: 'Ubuntu Mono',
    ligatures: 'arrows'
  };
  const gateway = new EventEmitter();
  gateway.get = key => data[key];
  gateway.set = key => value => {
    data[key] = value;
    gateway.emit('change', key);
  };
  return gateway;
};
