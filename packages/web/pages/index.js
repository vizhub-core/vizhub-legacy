import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'

export default class extends Page {
  render() {
    return (
      <Layout
        title='Datavis.tech'
        lang={this.props.lang}
        user={this.props.user}
        csrfToken={this.props.csrfToken}
      >
        <section className="hero is-medium is-dark is-bold">
          <div className="hero-body">
            <div className="container">
              <h2 className="subtitle">
                A platform for teaching & learning
              </h2>
              <h1 className="title">
                Data Visualization
              </h1>
              <h2 className="subtitle">
                using D3.js and SVG.
              </h2>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
