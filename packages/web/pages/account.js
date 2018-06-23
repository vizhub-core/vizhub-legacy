import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import { NextAuth } from 'next-auth/client'
import Page from '../components/page'
import Layout from '../components/layout'
import Cookies from 'universal-cookie'
import { userFromSession } from '../utils/userFromSession'

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
      user: props.user,
      csrfToken: props.csrfToken,
      alertText: null
    }
  }

  async componentDidMount() {
    const session = await NextAuth.init({ force: true })

    this.setState({
      user: userFromSession(session),
      csrfToken: session.csrfToken
    })

    // If the user bounces off to link/unlink their account we want them to
    // land back here after signing in with the other service / unlinking.
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })
  }

  render() {
    return (
      <Layout
        title={accountTitle}
        lang={this.props.lang}
        session={this.props.session}
      >
        {
          this.state.alertText
            ? <div> {this.state.alertText} </div>
            : null
        }
        {
          this.state.user.authenticated
            ? (
              <div>
                <h2>Delete your account</h2>
                <p>
                  If you delete your account it will be erased immediately.
                  All your data will be permanently lost.
                  You can sign up again at any time.
                </p>
                <form id="signout" method="post" action="/account/delete">
                  <input name="_csrf" type="hidden" value={this.state.csrfToken}/>
                  <button type="submit" >Delete Account</button>
                </form>
              </div>
            )
            : <Link href="/auth"><a>Sign in to manage your profile</a></Link>
        }
      </Layout>
    )
  }
}
