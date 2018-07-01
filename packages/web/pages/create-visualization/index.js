import React from 'react'
import Router from 'next/router'
import Page from '../../components/page'
import Layout from '../../components/layout'
import { getGateway } from '../../gateway'
import { BodyAuthenticated, BodyNotAuthenticated } from './body'
import { edit } from '../../utils/routePaths'

export default class extends Page {
  constructor() {
    super()

    this.createVisualizationFromScratch = (
      this.createVisualizationFromScratch.bind(this)
    )
  }

  createVisualizationFromScratch() {
    getGateway()
      .createVisualization({ owner: this.props.user.id })
      .then(({id}) => Router.push(edit({id})))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout
        title='Datavis.tech'
        lang={this.props.lang}
        user={this.props.user}
      >
        {
          this.props.user
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
