import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'

export default class extends Page {
  render() {
    return (
      <Layout
        title='Datavis.tech'
        lang={this.props.lang}
        session={this.props.session}
      >
        <div className='large' >Large</div>
      </Layout>
    )
  }
}
