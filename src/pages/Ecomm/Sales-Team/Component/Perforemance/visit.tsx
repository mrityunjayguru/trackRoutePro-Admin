// components/ClientVisits.jsx
import React from 'react';

const ClientVisits = () => {
  const visits:any = [
    { name: 'Ian Molina', date: '24 May 2025', outcome: 'Ongoing' },
    { name: 'Campbell King', date: '18 May 2025', outcome: 'Sale Generated' },
    { name: 'Corbin French', date: '14 May 2025', outcome: 'Differed' }
  ];

  return (
    <div className="client-visits">
      <h3>Client Visits</h3>
      <p>Clock-in Time: 09:43 AM</p>
      <p>Location: Ranchi, Jharkhand</p>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Client Name</th>
            <th>Date</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v:any, i:any) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{v.name}</td>
              <td>{v.date}</td>
              <td>{v.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientVisits;
