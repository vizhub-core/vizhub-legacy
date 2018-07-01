import Document, { Head, Main, NextScript } from 'next/document'

import '../css/index.sass'

export default class DefaultDocument extends Document {
  static async getInitialProps (ctx) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <html lang={this.props.__NEXT_DATA__.props.lang || 'en'}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link href="https://fonts.googleapis.com/css?family=Ubuntu|Ubuntu+Mono" rel="stylesheet" />
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
