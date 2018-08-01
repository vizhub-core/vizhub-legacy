import { Component } from 'react';
import Cookies from 'universal-cookie';
import classNames from 'classnames';
import { NextAuth } from 'next-auth/client';
import Link from 'next/link';

class UserMenuAuthenticated extends Component {

  constructor(props) {
    super(props);

    this.state = { open: false };

    this.toggle = () => {
      this.setState({ open: !this.state.open });
    };

    this.onSignOut = () => {
      props.onSignOut();
    };
  }

  render () {
    const { user, dropUp } = this.props;
    const { open } = this.state;
    return (
      <div
        onClick={this.toggle}
        className={classNames('dropdown is-right', {
          'is-active': open,
          'is-up': dropUp
        })}
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
              <a className='dropdown-item test-user-menu-create-vis-link'>
                Create Visualization
              </a>
            </Link>
            <Link href='/upload-dataset'>
              <a className='dropdown-item test-user-menu-create-dataset-link'>
                Upload Dataset
              </a>
            </Link>
            <hr className='dropdown-divider' />
            <a href='https://github.com/datavis-tech/vizhub-ui/issues/42' className='dropdown-item'>
              Profile
            </a>
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

export class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  async onSignOut() {
    
    // Save current URL so user is redirected back here after signing out
    const cookies = new Cookies();
    cookies.set('redirect_url', window.location.pathname, { path: '/' });

    await NextAuth.signout();
    location.reload(true);
  }
   
  render() {
    const { user, dropUp } = this.props;
    return user.authenticated
      ? (
        <UserMenuAuthenticated
          user={user}
          onSignOut={this.onSignOut}
          dropUp={dropUp}
        />
      )
      : (
        <Link href='/auth'>
          <a className='button test-user-menu-sign-in-link'>Sign up / Sign in</a>
        </Link>
      );
  }
}
