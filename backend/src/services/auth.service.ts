import { saveUserToDatabase } from '../utils/elasticsearch';

export const saveUserDetails = async (accessToken: string, profile: any) => {
  const user = {
    accessToken,
    profile
  };
  await saveUserToDatabase(user);
  return user;
};
