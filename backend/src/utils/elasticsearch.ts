import { Client } from '@elastic/elasticsearch';
import axios from 'axios';
import {User} from '../models/user.model';
const client = new Client({ node: process.env.ELASTICSEARCH_HOST });

export const saveUserToDatabase = async (user: any) => {
  await client.index({
    index: 'users',
    document: user
  });
};

export const fetchEmailsFromOutlook = async (userId: string) => {
  try {

    const response = await client.search({
      index: 'users',
      body: {
        query: {
          match: { userId }
        }
      }
    });

    if (response.hits.hits.length === 0) {
      throw new Error('User not found');
    }

    const user = response.hits.hits[0]._source as User;
    const accessToken = user.accessToken;


    const emailResponse = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const emails = emailResponse.data.value.map((email: any) => ({
      subject: email.subject,
      sender: email.from.emailAddress.address,
      receivedDateTime: email.receivedDateTime,
      bodyPreview: email.bodyPreview
    }));

    return emails;
  } catch (error) {
    console.error('Error fetching emails from Outlook:', error);
    throw error;
  }
};

export const saveEmailsToDatabase = async (userId: string, emails: any[]) => {
  for (const email of emails) {
    await client.index({
      index: 'emails',
      document: { userId, ...email }
    });
  }
};
