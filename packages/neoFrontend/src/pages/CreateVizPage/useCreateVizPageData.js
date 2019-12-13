import { useState, useEffect } from 'react';
import { fetchProfilePageData } from '../ProfilePage/ProfilePageDataContext/fetchProfilePageData';

// TODO make an API request here, for the list of template and popular vizzes.
export const useCreateVizPageData = () => {
  const [ownerUser, setOwnerUser] = useState(true);
  useEffect(() => {
    // TODO find a better solution - present the templates as a collection
    fetchProfilePageData('curran').then(data => {
      console.log(data);
      setOwnerUser(data.user);
    });
  }, []);
  return ownerUser;
};
