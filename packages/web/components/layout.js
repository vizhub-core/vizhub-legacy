import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Signin from './signin'
import { NextAuth } from 'next-auth/client'
import Cookies from 'universal-cookie'
import Package from '../package'
import '../css/index.sass'

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
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
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

export class UserMenu extends React.Component {
  constructor(props) {
    super(props)
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this)
  }

   async handleSignoutSubmit(event) {
     event.preventDefault()
     
     // Save current URL so user is redirected back here after signing out
     const cookies = new Cookies()
     cookies.set('redirect_url', window.location.pathname, { path: '/' })

     await NextAuth.signout()
     Router.push('/')
  }
   
  render() {
    const { user } = this.props;

    if (user.authenticated) {
      return (
        <div>
          {user.fullName}
          <div>
            <Link href="/create-visualization">
              <a>Create Visualization</a>
            </Link>
          </div>
          <div>
            <Link href="/account">
              <a>Your Account</a>
            </Link>
          </div>
          <form
            id="signout"
            method="post"
            action="/auth/signout"
            onSubmit={this.handleSignoutSubmit}
          >
            <input name="_csrf" type="hidden" value={this.props.csrfToken}/>
            <button type="submit">Sign out</button>
          </form>
        </div>
      )
    } else {
      // If not signed in, display sign in button
      return (
        <Link href="/auth">
          <a>Sign up / Sign in</a>
        </Link>
      )
    }
  }
}
