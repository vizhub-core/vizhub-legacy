import React from 'react';
import { FullPage } from 'vizhub-ui';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { NavBar } from '../components/organisms/navBar';
import { VisualizationPreview } from '../components/atoms/visualizationPreview';
import { getJSON } from '../utils/getJSON';

export default class extends Page {
  static async getInitialProps({req}) {
    const props = await super.getInitialProps({ req });

    //const url = 'https://vizhub.com/api/visualization/metadata';
    //const metadata = await (await fetch(url)).json();

    const metadata = await getJSON(`/api/visualization/metadata`, req);;

    props.metadata = metadata.reverse().slice(0, 500);
    return props;
  }
  render() {
    return (
      <TitledPage title='VizHub.com'>
        <NavBar
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />
        <section className='hero is-small is-dark is-bold'>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <div className='columns'>
                <div className='column' style={{ marginTop: '120px' }}>
                  <h2 className='subtitle'>
                    A platform for teaching, learning, and practicing
                  </h2>
                  <h1 className='title'>
                    Data Visualization
                  </h1>
                  <h2 className='subtitle'>
                    using D3.js and SVG.
                  </h2>
                  <a
                    className='button is-primary'
                    href='/create-visualization'
                  >
                    Get Started
                  </a>
                </div>
                <div className='column'>
                  <div>
                    <h2 className='subtitle'>
                      Check out this <a href='https://curran.github.io/dataviz-course-2018/'>online data visualization course</a>!
                    </h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/jeKO0tsB7XI?rel=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <h2 className='subtitle'>
                      <a href='https://medium.com/@currankelleher/vizhub-1-0-9fc56a70a464'>What's new in VizHub 1.0</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className='subtitle'
          style={{
            marginTop: '20px',
            marginLeft: '10px',
            marginBottom: '0px'
          }}
        >
          Recent Visualizations
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {
            this.props.metadata.map(info => (
              <VisualizationPreview key={info.id} info={info} userName='undefined'/>
            ))
          }
        </div>
      </TitledPage>
    );
  }
}
