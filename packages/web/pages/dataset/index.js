import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import { DatasetViewModel } from 'vizhub-presenters';
import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { SlightMargin } from '../../components/atoms/slightMargin';
import { TextContainer } from '../../components/atoms/textContainer';
import { DatasetContentTextPreview } from '../../components/atoms/datasetContentTextPreview';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';
import { baseUrl } from '../../utils/baseUrl';
import { datasetDownloadUrl } from '../../routes/routeGenerators';

const datasetLoadSnippet = url =>
  `d3.csv('${url}')
  .then(data => {
    console.log(data);
  });`;

export default class extends Page {
  static async getInitialProps({ req, query }) {
    const props = await super.getInitialProps({ req });
    const { slug, userName } = query;

    const response = await getJSON(`/api/dataset/get/${userName}/${slug}`, req);

    props.dataset = response.dataset;
    props.error = response.error;
    props.ownerUserName = userName;
    props.baseUrl = baseUrl(req);

    return props;
  }

  render() {
    const {
      error,
      dataset,
      user,
      csrfToken,
      ownerUserName,
      baseUrl
    } = this.props;

    if (error) {
      return <Error statusCode={error.statusCode} />
    }

    const {
      title,
      slug,
      text,
      format,
      sourceName,
      sourceUrl,
    } = new DatasetViewModel(dataset);

    const downloadUrl = datasetDownloadUrl({
      baseUrl,
      userName: ownerUserName,
      slug,
      format
    });

    return (
      <TitledPage title={title}>
        <NavBar user={user} csrfToken={csrfToken}/>
        <TextContainer>
          <SlightMargin>
            <DatasetContentTextPreview text={text} />
            <h1 className='title test-dataset-title'>
              {title}
            </h1>
            <p>
              from <a className='test-dataset-source' href={sourceUrl}>
                { sourceName }
              </a>
            </p>
            <p>
              <a className='button test-dataset-download-link' href={downloadUrl}>
                download
              </a>
            </p>
            <p>
              Code snippet for loading this dataset using D3:
              <pre>
                { datasetLoadSnippet(downloadUrl) }
              </pre>
            </p>
          </SlightMargin>
        </TextContainer>
      </TitledPage>
    );
  }
}
