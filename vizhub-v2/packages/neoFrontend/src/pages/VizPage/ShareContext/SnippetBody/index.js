import React, { useState, useMemo, useContext, useCallback } from 'react';
import { useLocation } from 'react-router';
import { getVizTitle, getVizFiles, getFile } from 'vizhub-presenters';
import { VizLinkBuilder } from '../../../../utils/viz';
import { useValue } from '../../../../useValue';
import { Input, Autocomplete } from '../../../../Input';
import { VizContext } from '../../VizContext';
import { URLStateContext } from '../../URLStateContext';
import { modes } from '../../URLStateContext/modes';
import { SubSectionDescription, FormRow, DescriptionRow } from '../../styles';
import { TextCopier } from '../TextCopier';
import { IFrame } from '../styles';

export const SnippetBody = () => {
  const { pathname } = useLocation();
  const { viz$ } = useContext(VizContext);
  const { activeFile = 'index.html', selectedLines } = useContext(
    URLStateContext
  );
  const title = useValue(viz$, getVizTitle);
  const files = useValue(viz$, getVizFiles);

  const [file, setFile] = useState(activeFile);
  const [suggestedFile, setSuggestedFile] = useState(activeFile);
  const [fileSuggestions, setFileSuggestions] = useState([]);

  const allPossibleFileSuggestions = useMemo(
    () => files.map((file) => ({ id: file.name, value: file.name })),
    [files]
  );

  const handleFileSuggestionChange = useCallback(
    (fileName) => {
      setFileSuggestions(
        allPossibleFileSuggestions.filter(({ value: name }) =>
          name.toLowerCase().includes(fileName.toLowerCase())
        )
      );
      setSuggestedFile(fileName);
    },
    [allPossibleFileSuggestions, setFileSuggestions]
  );

  const handleFileSelect = useCallback(
    (fileName) => {
      setFile(fileName);
      setSuggestedFile(fileName);
      setFileSuggestions([]);
    },
    [setFile, setSuggestedFile]
  );

  const [highlight, setHighlight] = useState(selectedLines);

  const [height, setHeight] = useState(300);

  const fileExists = Boolean(getFile(files, suggestedFile));

  const vizLinkBuilder = useMemo(() => VizLinkBuilder(pathname), [pathname]);

  const src = useMemo(
    () =>
      file
        ? vizLinkBuilder
            .setMode(modes.snippet)
            .setFile(file)
            .setLines(highlight)
            .get()
        : '',
    [vizLinkBuilder, highlight, file]
  );

  const html = useMemo(
    () =>
      [
        '<iframe',
        `height="${height}"`,
        `src="${src}"`,
        `title="${title}"`,
        'frameborder="0"',
        '></iframe>',
      ].join(' '),
    [src, title, height]
  );

  return (
    <>
      <SubSectionDescription>Snippet preview</SubSectionDescription>
      <IFrame frameBorder="0" height={height} title={title} src={src} />
      <form>
        <SubSectionDescription>Snippet settings</SubSectionDescription>
        <DescriptionRow>File</DescriptionRow>
        <FormRow>
          <Autocomplete
            value={suggestedFile}
            items={fileSuggestions}
            onChange={handleFileSuggestionChange}
            onSelect={handleFileSelect}
            size="grow"
          />
        </FormRow>
        <DescriptionRow>Lines</DescriptionRow>
        <FormRow>
          <Input
            value={highlight}
            onChange={setHighlight}
            size="grow"
            placeholder="e.g '14' for a single line, '14-16' or '14,16-17' for multiple"
          />
        </FormRow>
        <DescriptionRow>Height</DescriptionRow>
        <FormRow>
          <Input value={height} onChange={setHeight} size="grow" />
        </FormRow>
      </form>
      <SubSectionDescription>Embed snippet</SubSectionDescription>
      {fileExists && <TextCopier text={html} />}
    </>
  );
};
