import React from 'react'
import Page from '../../components/page'
import Layout from '../../components/layout'
import gateway from '../../gateway/client'
import { BodyAuthenticated, BodyNotAuthenticated } from './body'

export default class extends Page {

  createVisualizationFromScratch() {
    console.log('TODO call into Gateway')
  }

  render() {
    return (
      <Layout
        title='Datavis.tech'
        lang={this.props.lang}
        session={this.props.session}
      >
        {
          this.props.session.user
            ? (
              <BodyAuthenticated
                onFromScratchClick={this.createVisualizationFromScratch}
              />
            )
            : <BodyNotAuthenticated />
        }
      </Layout>
    )
  }
}
