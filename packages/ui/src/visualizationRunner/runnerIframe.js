import React, { Component } from 'react';
export class RunnerIFrame extends Component {

  constructor(props) {
    super(props);
    this.iFrameRef = React.createRef();
    this.setSrcDoc = () => {
      this.iFrameRef.current.setAttribute('srcDoc', this.props.srcDoc);
    };
  }

  componentDidMount() {
    this.setSrcDoc();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.runId !== this.props.runId) {
      console.clear();
      this.setSrcDoc();
    }
  }

  render() {
    const { width, height, scale } = this.props;
    return (
      <iframe
        className='visualization-runner'
        ref={this.iFrameRef}
        width={width}
        height={height}
        title='Visualization Runner'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
        }}
      />
    );
  }
};
