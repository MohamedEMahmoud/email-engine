import { fetchEmailsFromOutlook, saveEmailsToDatabase } from '../utils/elasticsearch';

export const syncEmailData = async (userId: string) => {
  const emails = await fetchEmailsFromOutlook(userId);
  await saveEmailsToDatabase(userId, emails);
};
