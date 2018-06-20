import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Signin from './signin'
import { NextAuth } from 'next-auth/client'
import Cookies from 'universal-cookie'
import Package from '../package'
import Styles from '../css/index.scss'

export default class extends React.Component {

  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired,
      providers: React.PropTypes.object.isRequired,
      children: React.PropTypes.object.isRequired,
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      providers: null
    }
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
          <style dangerouslySetInnerHTML={{__html: Styles}}/>
        </Head>

        <UserMenu
          session={this.props.session}
          togglediv={this.togglediv}
        />

        {this.props.children}

        <Signindiv
          togglediv={this.togglediv}
          session={this.props.session}
          providers={this.state.providers}
        />
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

    if (this.props.session && this.props.session.user) {
      const session = this.props.session
      return (
        <div>
          {session.user.name || session.user.email}
          <Link href="/account">
            <a>Your Account</a>
          </Link>
          <form
            id="signout"
            method="post"
            action="/auth/signout"
            onSubmit={this.handleSignoutSubmit}
          >
            <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
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

export class Signindiv extends React.Component {
  render() {
    if (this.props.providers === null) return null
    
    return (
      <Signin
        session={this.props.session}
        providers={this.props.providers}
      />
    )
  }
}
