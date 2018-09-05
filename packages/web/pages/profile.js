import React from 'react';
import Link from 'next/link';
import Error from 'next/error';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { SlightMargin } from '../components/atoms/slightMargin';
import { NavBar } from '../components/organisms/navBar';
import { getJSON } from '../utils/getJSON';
import { visualizationRoute, datasetRoute } from '../routes/routeGenerators';

export default class extends Page {

  static async getInitialProps({req, query}) {
    const props = await super.getInitialProps({ req });
    const url = `/api/user/getProfileData/${query.userName}`;
    const response = await getJSON(url, req);

    console.log({response});

    props.error = response.error;
    props.profileData = response;
    return props;
  }

  render() {
    const { error, user, csrfToken, profileData } = this.props;
    const { fullName, userName } = profileData.user;
    if (error) {
      return <Error statusCode={error.statusCode} />
    }
    return (
      <TitledPage title='Profile'>
        <NavBar user={user} csrfToken={csrfToken} />
        <SlightMargin>
          <div className='title test-profile-full-name'>
            {fullName}
          </div>
          {
            (profileData && profileData.visualizationInfos)
            ? profileData.visualizationInfos.map(({ id, title }) => (
                <div key={id} >
                  <Link href={visualizationRoute({ userName, id })}>
                    <a className='test-profile-visualization-info-title'>
                      {title}
                    </a>
                  </Link>
                </div>
              ))
            : null
          }
          {
            (profileData && profileData.datasetInfos)
            ? profileData.datasetInfos.map(({ id, title }) => (
                <div key={id} >
                  <Link href={datasetRoute({ userName, id })}>
                    <a className='test-profile-dataset-info-title'>
                      {title}
                    </a>
                  </Link>
                </div>
              ))
            : null
          }
        </SlightMargin>
      </TitledPage>
    );
  }
}
