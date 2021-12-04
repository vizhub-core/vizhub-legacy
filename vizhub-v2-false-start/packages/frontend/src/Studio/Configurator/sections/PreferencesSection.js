import React, { useContext } from 'react';
import { PreferencesContext } from '../../../contexts';
import { CheckBoxSVG } from '../../../svg';
import { RadioMenu } from '../RadioMenu';
import { Section } from '../Section';
import { Item, ItemIcon } from '../styles';

export const PreferencesSection = () => {
  const preferences = useContext(PreferencesContext);
  const { colorTheme, colorThemeOptions, setColorTheme } = preferences;
  const { font, fontOptions, setFont } = preferences;
  const { ligatures, ligaturesOptions, setLigatures } = preferences;

  return (
    <Section title="Preferences" id="preferences">
      <RadioMenu
        title="Color Theme"
        options={colorThemeOptions}
        activeOption={colorTheme}
        setActiveOption={setColorTheme}
      />
      <RadioMenu
        title="Font"
        options={fontOptions}
        activeOption={font}
        setActiveOption={setFont}
      />
      <RadioMenu
        title="Ligatures"
        options={ligaturesOptions}
        activeOption={ligatures}
        setActiveOption={setLigatures}
      />
      <Item>Font Size</Item>
      <Item>
        <ItemIcon>
          <CheckBoxSVG checked={true} />
        </ItemIcon>
        Grayscale
      </Item>
      <Item>
        <ItemIcon>
          <CheckBoxSVG checked={true} />
        </ItemIcon>
        Auto run
      </Item>
      <Item>
        <ItemIcon>
          <CheckBoxSVG checked={true} />
        </ItemIcon>
        Auto format
      </Item>
      <Item>
        <ItemIcon>
          <CheckBoxSVG checked={true} />
        </ItemIcon>
        Vim mode
      </Item>
    </Section>
  );
};
