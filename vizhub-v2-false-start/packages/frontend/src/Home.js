import React from 'react';
import { Link } from 'react-router-dom';
import { sampleStudioData, forkVizId } from 'vizhub-common';

const vizId = Object.keys(sampleStudioData.vizSnapshots)[0];
const userId = Object.keys(sampleStudioData.userData)[0];
const userName = sampleStudioData.userData[userId].userName;

export const Home = () => (
  <ul>
    <li>
      <Link to={`${userName}/${vizId}`}>Viz</Link>
    </li>
    <li>
      <Link to={`${userName}/${forkVizId}`}>Fork</Link>
    </li>
  </ul>
);
