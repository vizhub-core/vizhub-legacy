import Page from '../../components/page'
import { TitledPage } from '../../components/atoms/titledPage'
import { NavBar } from '../../components/organisms/navBar'
import { FullPage } from '../../components/atoms/fullPage'
import { CodeEditor } from './codeEditor'

export default class extends Page {
  constructor() {
    super()
  }

  render() {
    return (
      <TitledPage title='Edit Visualization'>
        <FullPage>
          <NavBar
            user={this.props.user}
            csrfToken={this.props.csrfToken}
          />
          <div>Editing {this.props.query.id}</div>
          <CodeEditor />
        </FullPage>
      </TitledPage>
    )
  }
}
