import React from 'react'
import { NextAuth } from 'next-auth/client'
import { getGateway } from '../gateway'
import { userFromSession } from '../utils/userFromSession'

const gateway = getGateway()

export default class extends React.Component {
  static async getInitialProps({req}) {
    const session = await NextAuth.init({req})
    return {
      user: userFromSession(session),
      csrfToken: session.csrfToken,
      lang: 'en',
      gateway
    }
  }
}
