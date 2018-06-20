import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import { NextAuth } from 'next-auth/client'
import Page from '../components/page'
import Layout from '../components/layout'
import Cookies from 'universal-cookie'

const accountTitle = 'Datavis.tech | Account'

export default class extends Page {

  static async getInitialProps({req}) {
    let props = await super.getInitialProps({req})
    props.linkedAccounts = await NextAuth.linked({req})
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
      session: props.session,
      isSignedIn: (props.session.user) ? true : false,
      name: '',
      email: '',
      alertText: null
    }
    if (props.session.user) {
      this.state.name = props.session.user.name
      this.state.email = props.session.user.email
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    const session = await NextAuth.init({force: true})
    this.setState({
      session: session,
      isSignedIn: (session.user) ? true : false
    })

    // If the user bounces off to link/unlink their account we want them to
    // land back here after signing in with the other service / unlinking.
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })
    
    this.getProfile()
  }
  
  getProfile() {
    fetch('/account/user', {
      credentials: 'include'
    })
    .then(r => r.json())
    .then(user => {
      if (!user.name || !user.email) return
      this.setState({
        name: user.name,
        email: user.email
      })
    })
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async onSubmit(e) {
    // Submits the URL encoded form without causing a page reload
    e.preventDefault()
    
    this.setState({
      alertText: null
    })
    
    const formData = {
      _csrf: await NextAuth.csrfToken(),
      name: this.state.name || '',
      email: this.state.email || ''
    }
    
    // URL encode form
    // Note: This uses a x-www-form-urlencoded rather than sending JSON so that
    // the form also in browsers without JavaScript
    const encodedform = Object.keys(formData).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
    }).join('&')
    
    fetch('/account/user', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodedform
    })
    .then(async res => {
      if (res.status === 200) {
        this.getProfile()
        this.setState({
          alertText: 'Changes to your profile have been saved',
        })
        // Force update session so that changes to name or email are reflected
        // immediately in the navbar (as we pass our session to it).
        this.setState({
          session: await NextAuth.init({force: true}), // Update session data
        })
      } else {
        this.setState({
          session: await NextAuth.init({force: true}), // Update session data
          alertText: 'Failed to save changes to your profile',
        })
      }
    })
  }
  
  render() {
    if (this.state.isSignedIn === true) {
      const alert = (this.state.alertText === null)
        ? <div/>
        : (
          <div>
            {this.state.alertText}
          </div>
        )
      
      return (
        <Layout
          title={accountTitle}
          lang={this.props.lang}
          session={this.props.session}
        >
          {alert}
          <LinkAccounts
            session={this.props.session}
            linkedAccounts={this.props.linkedAccounts}
          />
          <div>
            <h2>Delete your account</h2>
            <p>
              If you delete your account it will be erased immediately.
              All your data will be permanently lost.
              You can sign up again at any time.
            </p>
            <form id="signout" method="post" action="/account/delete">
              <input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>
              <button type="submit" >Delete Account</button>
            </form>
          </div>
        </Layout>
      )
    } else {
      return (
        <Layout
          title={accountTitle}
          lang={this.props.lang}
          session={this.props.session}
        >
          <Link href="/auth"><a>Sign in to manage your profile</a></Link>
        </Layout>
      )
    }
  }
}

export class LinkAccounts extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          Object.keys(this.props.linkedAccounts).map((provider, i) => (
            <LinkAccount
              key={i}
              provider={provider}
              session={this.props.session}
              linked={this.props.linkedAccounts[provider]}
            />
          ))
        }
      </React.Fragment>
    )
  }
}

export class LinkAccount extends React.Component {
  render() {
    if (this.props.linked === true) {
      return (
        <form method="post" action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`}>
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
          <button type="submit">
            Unlink from {this.props.provider}
          </button>
        </form>
      )
    } else {
      return (
        <p>
          <a className="btn btn-block btn-outline-primary" href={`/auth/oauth/${this.props.provider.toLowerCase()}`}>
            Link with {this.props.provider}
          </a>
        </p>
      )
    }
  }
}
