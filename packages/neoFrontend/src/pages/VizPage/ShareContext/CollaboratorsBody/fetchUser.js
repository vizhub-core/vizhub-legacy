import { fetchUsers } from './fetchUsers';

export const fetchUser = async (userId) => {
  try {
    const result = await fetchUsers([userId]);
    return result.users[0];
  } catch (error) {
    console.error(error);
  }
};
