import Page from '../../components/page'
import Layout from '../../components/layout'
import { CodeEditor } from './codeEditor'

export default class extends Page {
  constructor() {
    super()
  }

  render() {
    return (
      <Layout
        title='Datavis.tech'
        lang={this.props.lang}
        user={this.props.user}
      >
        <div>Editing {this.props.query.id}</div>
        <CodeEditor />
      </Layout>
    )
  }
}
