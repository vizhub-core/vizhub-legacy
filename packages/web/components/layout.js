import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Signin from './signin'
import Package from '../package'
import { UserMenu } from './userMenu'

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

        <UserMenu
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />

        {this.props.children}
      </React.Fragment>
    )
  }
}
