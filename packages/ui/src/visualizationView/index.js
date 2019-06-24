import React from 'react';
import { VisualizationRunner } from '../visualizationRunner/index.js';
import { MdFullscreen } from 'react-icons/md';
import { Avatar } from '../atoms/avatar';

export const VisualizationView = props => {
  const {
    width,
    height,
    files,
    runId,
    title,
    description,
    ownerUser,
    disablePointerEvents,
    fullScreenUrl
  } = props;

  const pointerEvents = disablePointerEvents ? 'none' : 'auto';

  return (
    <div className='visualization-view' style={{ pointerEvents }} >
      <VisualizationRunner
        files={files}
        width={width}
        height={height}
        runId={runId}
      />
      <div className='visualization-view-body'>
        <div style={{ display: 'flex' }}>
          <div className='visualization-view-title' style={{ flexGrow: 1 }}>
            {title}
          </div>
          <a href={fullScreenUrl} title='Fullscreen' target='_blank'>
            <MdFullscreen size={30}/>
          </a>
        </div>
        <a className='test-vis-view-user-name' href={`/${ownerUser.userName}`} >
          <Avatar avatarUrl={ownerUser.avatarUrl}/>
          {ownerUser.userName}
        </a>
        <div
          className='visualization-view-description content'
          dangerouslySetInnerHTML={{ __html: description }}
        >
        </div>
      </div>
      <div className='license-info'>All code in VizHub is released under the MIT License.</div>
    </div>
  );
};
