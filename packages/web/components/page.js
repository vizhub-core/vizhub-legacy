import React from 'react';
import { NextAuth } from 'next-auth/client';
import { userFromSession } from '../utils/userFromSession';

export default class extends React.Component {
  static async getInitialProps({req, query}) {
    const session = await NextAuth.init({req});
    return {
      user: userFromSession(session),
      csrfToken: session.csrfToken,
      lang: 'en',
      query
    };
  }
}
