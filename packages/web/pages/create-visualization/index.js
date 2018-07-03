import React from 'react'
import Router from 'next/router'
import Page from '../../components/page'
import { getGateway } from '../../gateway'
import { BodyAuthenticated, BodyNotAuthenticated } from './body'
import { edit } from '../../utils/routePaths'
import { TitledPage } from '../../components/atoms/titledPage'
import { ActionBox } from '../../components/molecules/actionBox'
import { NavBar } from '../../components/organisms/navBar'

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
      <TitledPage title='Create Visualization'>
        <NavBar
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />
        <ActionBox title='Create a Visualization'>
          {
            this.props.user
              ? (
                <BodyAuthenticated
                  onFromScratchClick={this.createVisualizationFromScratch}
                />
              )
              : <BodyNotAuthenticated />
          }
        </ActionBox>
      </TitledPage>
    )
  }
}
