import React from 'react';
import { Link } from 'react-router-dom';
import { sampleStudioData } from 'vizhub-common';

const vizId = Object.keys(sampleStudioData.vizSnapshots)[0];
const userId = Object.keys(sampleStudioData.userData)[0];
const userName = sampleStudioData.userData[userId].userName;

export const Home = () => (
  <ul>
    <li>
      <Link to={`${userName}/${vizId}`}>Viewer</Link>
    </li>
  </ul>
);
