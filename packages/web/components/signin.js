import React from 'react'
import Router from 'next/router'
import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'

export default class extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      session: this.props.session,
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
    if (this.props.session.user) {
      return(<div/>)
    } else {
      return (
        <React.Fragment>
          <p className="text-center" style={{marginTop: 10, marginBottom: 30}}>{`If you don't have an account, one will be created when you sign in.`}</p>
          <div>
            <div xs={12} md={6}>
              <SignIndivs providers={this.props.providers}/>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export class SignIndivs extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          Object.keys(this.props.providers).map((provider, i) => {
            if (!this.props.providers[provider].signin) return null

            return (
              <p key={i}>
                <a className="btn btn-block btn-outline-secondary" href={this.props.providers[provider].signin}>
                  Sign in with {provider}
                </a>
              </p>
              )              
          })
        }
      </React.Fragment>
    )
  }
}
