import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmailList from './EmailList';

interface Email {
  subject: string;
  sender: string;
}

const DataPage: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('/api/emails/sync');
        setEmails(response.data.emails);
        setIsSyncing(false);
      } catch (error) {
        console.error('Error fetching emails:', error);
        setIsSyncing(false);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="DataPage">
      <h2>Email Data</h2>
      {isSyncing ? <p>Synchronizing...</p> : <EmailList emails={emails} />}
    </div>
  );
};

export default DataPage;
