import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'
import Link from 'next/link'

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
