import React from 'react';
import Link from 'next/link';
import Error from 'next/error';
import { Avatar } from 'vizhub-ui';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { TextContainer } from '../components/atoms/textContainer';
import { NavBar } from '../components/organisms/navBar';
import { getJSON } from '../utils/getJSON';
import { visualizationRoute, datasetRoute } from '../routes/routeGenerators';
import { VisualizationPreview } from '../components/atoms/visualizationPreview';

export default class extends Page {

  static async getInitialProps({req, query}) {
    const props = await super.getInitialProps({ req });
    const url = `/api/user/getProfileData/${query.userName}`;
    const response = await getJSON(url, req);

    props.error = response.error;
    props.profileData = response;
    return props;
  }

  render() {
    const { error, user, csrfToken, profileData } = this.props;
    if (error) {
      return <Error statusCode={error.statusCode} />
    }
    const { userName, avatarUrl } = profileData.user;
    return (
      <TitledPage title='Profile'>
        <NavBar user={user} csrfToken={csrfToken} />
        <div style={{ margin: '30px' }}>
          <div className='title test-profile-full-name' style={{ marginLeft: '10px', marginBottom: '50px' }}>
            <Avatar avatarUrl={avatarUrl} scale={120}/>
            {userName}
          </div>
          {
            (profileData && profileData.visualizationInfos)
            ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  profileData.visualizationInfos.map(info => (
                    <VisualizationPreview key={info.id} info={info} userName={userName}/>
                  ))
                }
              </div>
            )
            : null
          }
          <div style={{ marginLeft: '10px' }}>
            {
              (profileData && profileData.datasetInfos)
              ? <div className='subtitle' style={{marginTop: '50px'}}>Datasets</div>
              : null
            }
            {
              (profileData && profileData.datasetInfos)
              ? profileData.datasetInfos.map(({ id, slug, title }) => (
                  <div key={id} >
                    <Link href={datasetRoute({ userName, slug })}>
                      <a className='test-profile-dataset-info-title'>
                        {title}
                      </a>
                    </Link>
                  </div>
                ))
              : null
            }
          </div>
        </div>
      </TitledPage>
    );
  }
}
