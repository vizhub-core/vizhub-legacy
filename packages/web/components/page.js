import React from 'react'
import { NextAuth } from 'next-auth/client'
import { getGateway } from '../gateway'

const gateway = getGateway()

export default class extends React.Component {
  static async getInitialProps({req}) {
    return {
      session: await NextAuth.init({req}),
      lang: 'en',
      gateway
    }
  }
}
