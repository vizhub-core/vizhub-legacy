import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/dom'
import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../authentication';

import { Body as ProfilePage } from './Body';
import { ProfilePageDataContext } from './ProfilePageDataContext';
import { Themed } from '../../theme';

test('NameConsumer shows value from provider', () => {
  const profilePageData = { visualizationInfos: [
    { id: 1, privacy: 'private', title: 'My little private visualization'},
    { id: 2, privacy: 'public', title: 'My big public visualization'},
    { id: 3, privacy: undefined, title: 'My small undefined public visualization'},
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
  render(tree, { wrapper: MemoryRouter })
  expect(screen.getByText('My little private visualization')).toBeInTheDocument()
  expect(screen.getByText('My big public visualization')).toBeInTheDocument()
})
test('clicking private shows private viz', () => {
  const profilePageData = { visualizationInfos: [
    { id: 1, privacy: 'private', title: 'My little private visualization'},
    { id: 2, privacy: 'public', title: 'My big public visualization'},
    { id: 3, privacy: undefined, title: 'My small undefined public visualization'},
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
  render(tree, { wrapper: MemoryRouter })
  fireEvent.click(screen.getByText('Private'))
  expect(screen.getByText('My little private visualization')).toBeInTheDocument()
  expect(screen.queryByText('My big public visualization')).not.toBeInTheDocument()
})
