import React from 'react'
import Head from 'next/head'
import { NavBar } from './navBar'

export default class extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    if (!this.props.title) {
      throw new Error('title prop is required for components/layout.js');
    }
    return (
      <React.Fragment>

        <Head>
          <title>{this.props.title}</title>
        </Head>

        <NavBar
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />

        {this.props.children}
      </React.Fragment>
    )
  }
}
