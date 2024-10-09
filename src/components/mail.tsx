import React from 'react';
interface MailProps {
    name: string;
    id: string;
    flowName: string;    
}
const Mail: React.FC <MailProps>= ({name,id,flowName}) => {
  return (
    <div>
      <h1>致 {id} {name}</h1>
        <p>恭喜你通过 {flowName} 的考核</p>
    </div>
  );
}

export default Mail;