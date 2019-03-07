import { hcl } from 'd3-color';

const base = {
  headerHeight: 32,
  infoAvatarHeight: 64,
  infoAvatarPadding: 12,
  commentAvatarHeight: 32
};

const invertLuminance = color => {
  const { h, c, l } = hcl(color);
  return hcl(h, c, 100 - l).hex();
};

export const light = Object.assign({}, base, {
  foreground: 'black',
  background: 'white',

  textMain: '#121212',
  textLight: '#636363'
});

export const dark = Object.assign({}, base, {
  foreground: 'white',
  background: 'black',

  textMain: invertLuminance(light.textMain),
  textLight: invertLuminance(light.textLight)
});
