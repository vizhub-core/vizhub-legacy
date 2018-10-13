import React from 'react';
import { FullPage } from 'vizhub-ui';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { NavBar } from '../components/organisms/navBar';

export default class extends Page {
  render() {
    return (
      <TitledPage title='VizHub.com'>
        <FullPage>
          <NavBar
            user={this.props.user}
            csrfToken={this.props.csrfToken}
          />
          <section className='hero is-medium is-dark is-bold is-fullheight'>
            <div className='hero-body'>
              <div className='container has-text-centered'>
                <h2 className='subtitle'>
                  A platform for teaching & learning
                </h2>
                <h1 className='title'>
                  Data Visualization
                </h1>
                <h2 className='subtitle'>
                  using D3.js and SVG.
                </h2>
                <a
                  className='button'
                  href='https://vizhub.com/curran/86a75dc8bdbe4965ba353a79d4bd44c8'
                >
                  Get Started
                </a>
                <div style={{ marginTop: '100px' }}>
                  <h2 className='subtitle'>
                    Take this <a href='https://curran.github.io/dataviz-course-2018/'>online course</a> to start learning!
                  </h2>
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL9yYRbwpkykvOXrZumtZWbuaXWHvjD8gi" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                  <h2 className='subtitle'>
                    Also, check out what's new in <a href='https://medium.com/@currankelleher/vizhub-1-0-9fc56a70a464'>VizHub 1.0</a>!
                  </h2>
                </div>
              </div>
            </div>
          </section>
        </FullPage>
      </TitledPage>
    );
  }
}
