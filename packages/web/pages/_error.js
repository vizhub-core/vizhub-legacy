/**
 * Creating a page named _error.js lets you override HTTP error messages
 */
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Styles from '../css/index.scss'
import { withRouter } from 'next/router'

class ErrorPage extends React.Component {

  static propTypes() {
    return {
      errorCode: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired
    }
  }

  static getInitialProps({res, xhr}) {
    const errorCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return {errorCode}
  }

  render() {
    var response
    switch (this.props.errorCode) {
      case 200: // Also display a 404 if someone requests /_error explicitly
      case 404:
        response = (
          <div>
            <Head>
              <style dangerouslySetInnerHTML={{__html: Styles}}/>
            </Head>
            <div>
              <h1 className="display-4">Page Not Found</h1>
              <p>The page <strong>{ this.props.router.pathname }</strong> does not exist.</p>
              <p><Link href="/"><a>Home</a></Link></p>
            </div>
          </div>
        )
        break
      case 500:
        response = (
          <div>
            <Head>
              <style dangerouslySetInnerHTML={{__html: Styles}}/>
            </Head>
            <div>
              <h1 className="display-4">Internal Server Error</h1>
              <p>An internal server error occurred.</p>
            </div>
          </div>
        )
        break
      default:
        response = (
          <div>
            <Head>
              <style dangerouslySetInnerHTML={{__html: Styles}}/>
            </Head>
            <div>
              <h1 className="display-4">HTTP { this.props.errorCode } Error</h1>
              <p>
                An <strong>HTTP { this.props.errorCode }</strong> error occurred while
                trying to access <strong>{ this.props.router.pathname }</strong>
              </p>
            </div>
          </div>
        )
    }

    return response
  }

}

export default withRouter(ErrorPage)
