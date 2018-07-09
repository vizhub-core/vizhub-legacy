import React from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { NextAuth } from 'next-auth/client';

export class SignIn extends React.Component {
  
  constructor(props) {
    super(props);
    this.signInAsCI = this.signInAsCI.bind(this);
  }

  signInAsCI(event) {
    const email = 'ci@foo.com';
    const password = 'ci';
    
    NextAuth.signin({email, password})
      .then(authenticated => {
        Router.push('/auth/callback');
      });
  }
  
  render() {
    if (this.props.user.authenticated) {
      return null;
    } else {
      return (
        <React.Fragment>
          <p>If you don't have an account, one will be created when you sign in.</p>

          {
            process.env.NODE_ENV === 'development'
              ? (
                <button className='button test-sign-in-as-ci' onClick={this.signInAsCI} >
                  Sign in as CI
                </button>
              )
              : null
          }
          <section className='section'>
            <SignInButtons providers={this.props.providers}/>
          </section>

          <p>By signing in you agree to our <a href='https://datavis.tech/static/legal/Terms%20of%20Use.pdf'>terms of use</a>.</p>
        </React.Fragment>
      );
    }
  }
}

export class SignInButtons extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          Object.keys(this.props.providers).map((provider, i) => {
            const signin = this.props.providers[provider].signin;
            return signin ? (
              <a className='button' key={i} href={signin} >
                Sign in with {provider}
              </a>
            ) : null;
          })
        }
      </React.Fragment>
    );
  }
}
