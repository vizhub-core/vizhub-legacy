import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { DatasetViewModel } from 'datavis-tech-presenters';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { SlightMargin } from '../../components/atoms/slightMargin';
import { TextContainer } from '../../components/atoms/textContainer';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';

export default class extends Page {
  static async getInitialProps({ req, query }) {
    const props = await super.getInitialProps({ req });
    const { slug } = query;
    //const { userName } = props.user;

    const response = await getJSON(`/api/dataset/get/${slug}`, req);

    props.dataset = response.dataset;
    props.error = response.error;

    return props;
  }

  render() {
    const { error, dataset, user, csrfToken } = this.props;

    if (error) {
      return <Error statusCode={error.statusCode} />
    }

    const { title } = new DatasetViewModel(dataset);

    return (
      <TitledPage title={title}>
        <NavBar user={user} csrfToken={csrfToken}/>
        <TextContainer>
          <SlightMargin>
            <h1 className='title test-dataset-title'>{title}</h1>
          </SlightMargin>
        </TextContainer>
      </TitledPage>
    );
  }
}
