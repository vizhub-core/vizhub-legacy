import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { NextAuth } from 'next-auth/client'
import Page from '../../components/page'
import Layout from '../../components/layout'
import SignIn from '../../components/signin'
import { userFromSession } from '../../utils/userFromSession'

export default class extends Page {
  
  static async getInitialProps({req, res, query}) {
    const props = await super.getInitialProps({req})
    const session = await NextAuth.init({force: true, req: req})
    props.user = userFromSession(session)
    props.providers = await NextAuth.providers({req})
    
    // If signed in already, redirect to account management page.
    if (props.user.authenticated) {
      if (req) {
        res.redirect('/account')
      } else {
        Router.push('/account')
      }
    }

    // If passed a redirect parameter, save it as a cookie
    if (query.redirect) {
      const cookies = new Cookies((req && req.headers.cookie) ? req.headers.cookie : null)
      cookies.set('redirect_url', query.redirect, { path: '/' })
    }
    
    return props
  }
  
  render() {
    return (
      <Layout
        title='Datavis.tech | Sign in'
        lang={this.props.lang}
        user={this.props.user}
      >
        <SignIn
          user={this.props.user}
          providers={this.props.providers}
        />
      </Layout>
    )
  }
}
