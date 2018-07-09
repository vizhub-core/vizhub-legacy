import { Component } from 'react'
import Measure from 'react-measure'

const RunnerIFrame = ({html, width, height, scale}) => (
  <iframe
    srcDoc={html}
    width={width}
    height={height}
    style={{
      transform: `scale(${scale})`,
      transformOrigin: '0 0',
    }}
  />
);

export class Runner extends Component {
  constructor() {
    super();
    this.state = {
      bounds: { width: -1, height: -1 }
    };

    this.onResize = ({ bounds }) => this.setState({ bounds });
  }

  render() {
    const bounds = this.state.bounds;
    const { width, height, html } = this.props;
    const scale = bounds.width / width;

    return (
      <Measure bounds onResize={this.onResize} >
        {({ measureRef }) =>
          <div ref={measureRef} style={{height: `${height * scale}px`}} >
            <RunnerIFrame
              html={html}
              width={width}
              height={height}
              scale={scale}
            />
          </div>
        }
      </Measure>
    )
  }
}
