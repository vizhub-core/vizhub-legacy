import React, { Component } from 'react';
import Measure from 'react-measure';
import { RunnerIFrame } from './runnerIframe';
import { computeScale } from './computeScale';
import { GetSrcDoc } from './getSrcDoc';

export class VisualizationRunner extends Component {
  constructor() {
    super();
    this.state = { bounds: { width: -1, height: -1 } };
    this.onResize = ({ bounds }) => this.setState({ bounds });
    this.getSrcDoc = GetSrcDoc();
  }

  render() {
    const { width, height, files, runId, measureHeight } = this.props;
    const boundsWidth = this.state.bounds.width;
    const boundsHeight = measureHeight ? this.state.bounds.height : Infinity;
    const scale = computeScale({ boundsWidth, boundsHeight, width, height });
    const srcDoc = this.getSrcDoc(files, runId);

    // These properties are for vertical centering in fullscreen mode.
    const measureStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }

    // Required for correct resize in fullscreen mode.
    // Breaks the visualization editor view if enabled there.
    if (measureHeight) {
      measureStyle.height = '100%';
    }

    return (
      <Measure bounds onResize={this.onResize} >
        {({ measureRef }) =>
          <div ref={measureRef} style={measureStyle}>
            <div style={{
              width: `${width * scale}px`,
              height: `${height * scale}px`,
              margin: '0 auto'
            }}>
              <RunnerIFrame
                width={width}
                height={height}
                scale={scale}
                srcDoc={srcDoc}
                runId={runId}
              />
            </div>
          </div>
        }
      </Measure>
    );
  }
}
