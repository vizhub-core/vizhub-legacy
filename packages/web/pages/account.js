import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { NextAuth } from 'next-auth/client'
import Cookies from 'universal-cookie'
import Page from '../components/page'
import { TitledPage } from '../components/atoms/titledPage'
import { ActionBox } from '../components/molecules/actionBox'
import { NavBar } from '../components/organisms/navBar'
import { userFromSession } from '../utils/userFromSession'

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
      <TitledPage title='Account'>
        <NavBar
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />
        {
          this.state.alertText
            ? <div> {this.state.alertText} </div>
            : null
        }
        {
          this.state.user.authenticated
            ? (
              <ActionBox title='Your Account'>
                <p>
                  If you delete your account it will be erased immediately.
                </p>
                <p>
                  All your data will be permanently lost.
                </p>
                <p>
                  You can sign up again at any time.
                </p>
                <section className='section'>
                  <form id="delete" method="post" action="/account/delete">
                    <input name="_csrf" type="hidden" value={this.state.csrfToken}/>
                    <button className="button is-danger" type="submit" >Delete Account</button>
                  </form>
                </section>
              </ActionBox>
            )
            : <Link href="/auth"><a>Sign in to manage your profile</a></Link>
        }
      </TitledPage>
    )
  }
}
