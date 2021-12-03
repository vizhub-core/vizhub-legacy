import React, { useContext } from 'react';
//import { HomePageDataContext } from './HomePageDataContext';

export const Body = ({ vizInfoSnapshots }) => {
  //TODO const { vizInfos } = useContext(HomePageDataContext);
  return vizInfoSnapshots.map((vizInfoSnapshot) => (
    <div className="title">{vizInfoSnapshot.data.title}</div>
  ));
};
