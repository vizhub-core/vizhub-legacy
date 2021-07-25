import React, { useContext } from 'react';
import { VizContext } from './VizContext';

export const Body = () => {
  const { vizInfo, vizContent } = useContext(VizContext);
  const { title } = vizInfo;
  const { files } = vizContent;
  return (
    <div>
      <div>{title}</div>
      {files ? files.map((file, i) => <div key={i}>{file.name}</div>) : null}
    </div>
  );
};
