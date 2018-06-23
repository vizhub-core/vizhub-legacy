import React from 'react'
import Link from 'next/link'
import Page from '../../components/page'
import Layout from '../../components/layout'

export default class extends Page {

  static async getInitialProps({req, query}) {
    let props = await super.getInitialProps({req})
    props.action = query.action || null
    props.type = query.type || null
    props.service = query.service || null
    return props
  }

  render() {
    if (this.props.action == 'signin' && this.props.type == 'oauth') {
      return(
        <Layout
          title='Authentication Failed'
          lang={this.props.lang}
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        >
          <div className="text-center mb-5">
            <h1 className="display-4 mt-5 mb-3">Unable to sign in</h1>
            <p className="lead">An account associated with your email address already exists.</p>
          </div>
        </Layout>
      )
    } else if (this.props.action == 'signin' && this.props.type == 'token-invalid') {
      return(
        <Layout {...this.props} navmenu={false}>
          <div className="text-center mb-5">
            <h1 className="display-4 mt-5 mb-2">Link not valid</h1>
            <p className="lead">This sign in link is no longer valid.</p>
            <p className="lead"><Link href="/auth"><a>Get a new sign in link</a></Link></p>
          </div>
        </Layout>
      )
    } else {
      return(
        <Layout {...this.props} navmenu={false}>
          <div className="text-center mb-5">
            <h1 className="display-4 mt-5">Error signing in</h1>
            <p className="lead">An error occured while trying to sign in.</p>
            <p className="lead"><Link href="/auth"><a>Sign in with email or another service</a></Link></p>
          </div>
        </Layout>
      )
    }
  }
}
