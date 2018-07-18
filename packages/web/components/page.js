import React from 'react';
import { NextAuth } from 'next-auth/client';
import { userFromSession } from '../utils/userFromSession';

import '../css/index.sass';

export default class Page extends React.Component {
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
