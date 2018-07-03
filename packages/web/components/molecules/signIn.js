import React from 'react'
import Router from 'next/router'
import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'

export class SignIn extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      providers: this.props.providers,
      submitting: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }

  handleSubmit(event) {
    event.preventDefault()
    
    if (!this.state.email) return

    this.setState({
      submitting: true
    })
    
    // Save current URL so user is redirected back here after signing in
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })

    NextAuth.signin(this.state.email)
      .then(() => {
        Router.push(`/auth/check-email?email=${this.state.email}`)
      })
      .catch(err => {
        Router.push(`/auth/error?action=signin&type=email&email=${this.state.email}`)
      })
  }
  
  render() {
    if (this.props.user.authenticated) {
      return null
    } else {
      return (
        <React.Fragment>
          <p>If you don't have an account, one will be created when you sign in.</p>
          <section className='section'>
            <SignInButtons providers={this.props.providers}/>
          </section>

          <p>By signing in you agree to our <a href='https://datavis.tech/static/legal/Terms%20of%20Use.pdf'>terms of use</a>.</p>
        </React.Fragment>
      )
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
    )
  }
}
