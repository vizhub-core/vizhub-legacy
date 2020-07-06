import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../authentication';

import { ProfilePage } from './index.js';
import { ProfilePageDataContext } from './ProfilePageDataContext';
import { Themed } from '../../theme';

test('NameConsumer shows value from provider', () => {
  const profilePageData = { visualizationInfos: [
    { privacy: 'private', title: 'My little private visualization'},
    { privacy: 'public', title: 'My big public visualization'},
  ]}
  const me = {}
  const tree = (
    <Themed>
      <AuthContext.Provider value={me}>
        <ProfilePageDataContext.Provider value={profilePageData}>
          <ProfilePage />
        </ProfilePageDataContext.Provider>
      </AuthContext.Provider>
    </Themed>
  )
  const { getByText } = render(tree, { wrapper: MemoryRouter })
  expect(getByText('My little private visualization')).toBeInTheDocument()
  expect(getByText('My big public visualization')).toBeInTheDocument()
})
