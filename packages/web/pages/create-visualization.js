import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'

const Authenticated = ({onFromScratchClick}) => {
  const fromScratchClick = e => {
    e.preventDefault()
    onFromScratchClick()
  }

  return (
    <React.Fragment>
      <h1>Create Visualization</h1>
      <div>
        <a href='#scratch' onClick={fromScratchClick}>Start from scratch</a>
      </div>
      <div>
        <a href='#template'>Choose a template (coming soon!)</a>
      </div>
    </React.Fragment>
  )
}

const NotAuthenticated = () => (
  <div>You must first log in to create a visualization.</div>
)

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
              <Authenticated
                onFromScratchClick={this.createVisualizationFromScratch}
              />
            )
            : <NotAuthenticated />
        }
      </Layout>
    )
  }
}
