import React from 'react';

interface Email {
  subject: string;
  sender: string;
}

interface EmailListProps {
  emails: Email[];
}

const EmailList: React.FC<EmailListProps> = ({ emails }) => {
  return (
    <div className="EmailList">
      <h3>Fetched Emails</h3>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>
            <strong>{email.subject}</strong> - {email.sender}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
