import Cookies from 'universal-cookie'
import classNames from 'classnames'
import { NextAuth } from 'next-auth/client'
import Link from 'next/link'

class UserMenuAuthenticated extends React.Component {

  constructor(props) {
    super(props);

    this.state = { open: false };

    this.toggle = event => {
      this.setState({ open: !this.state.open });
    };

    this.onSignOut = () => {
      props.onSignOut();
    };
  }

  render () {
    const { user } = this.props;
    const { open } = this.state;
    return (
      <div
        onClick={this.toggle}
        className={classNames('dropdown is-right', {'is-active': open})}
      >
        <div className='dropdown-trigger'>
          <button
            className='button test-user-menu-button'
            aria-haspopup='true'
            aria-controls='dropdown-menu'
          >
            {user.fullName}
          </button>
        </div>
        <div className='dropdown-menu' id='dropdown-menu' role='menu'>
          <div className='dropdown-content'>
            <Link href='/create-visualization'>
              <a className='dropdown-item'>
                Create Visualization
              </a>
            </Link>
            <Link href='/upload-dataset'>
              <a className='dropdown-item'>
                Upload Dataset
              </a>
            </Link>
            <hr className='dropdown-divider' />
            <Link href={`/${user.userName}`}>
              <a className='dropdown-item'>
                Profile
              </a>
            </Link>
            <Link href='/account'>
              <a className='dropdown-item'>
                Account
              </a>
            </Link>
            <hr className='dropdown-divider' />
            <a onClick={this.onSignOut} href='#' className='dropdown-item'>
              Sign out
            </a>
          </div>
        </div>
      </div>
    );
    //return (
    //    <form
    //      id='signout'
    //      method='post'
    //      action='/auth/signout'
    //      onSubmit={this.handleSignoutSubmit}
    //    >
    //      <input name='_csrf' type='hidden' value={this.props.csrfToken}/>
    //      <button type='submit'>Sign out</button>
    //    </form>
    //  </div>
    //);
  }
}

export class UserMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onSignOut = this.onSignOut.bind(this)
  }

  async onSignOut() {
    
    // Save current URL so user is redirected back here after signing out
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })

    await NextAuth.signout()
    location.reload(true);
  }
   
  render() {
    const { user } = this.props;
    return user.authenticated
      ? (
        <UserMenuAuthenticated
          user={user}
          onSignOut={this.onSignOut}
        />
      )
      : (
        <Link href='/auth'>
          <a className='button test-user-menu-sign-in-link'>Sign up / Sign in</a>
        </Link>
      );
  }
}
