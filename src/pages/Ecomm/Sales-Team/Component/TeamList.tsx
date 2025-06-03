import React from 'react';
import { useSelector } from 'react-redux';

const team = [
  { name: 'Evelyn Rivera', designation: 'Sales Assistant', code: 'TRPE0001' },
  { name: 'Macie Fuller', designation: 'Sales Lead', code: 'TRPE0002' },
  { name: 'Felix Delacruz', designation: 'Sales Assistant', code: 'TRPE0003' },
];

const TeamList = ({ onSelect }: { onSelect: (name: string) => void }) => {
  const salesTeam = useSelector((state: any) => state?.slesTeame?.slesTeame);
  console.log(salesTeam,"salesTeamsalesTeam")

  return (
    <div className="w-1/2 p-4">
      <h3 className="text-lg font-semibold mb-2">Team List</h3>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-3 py-2 border rounded mb-4"
      />
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500">
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Employee Code</th>
          </tr>
        </thead>
        <tbody>
          {salesTeam.map((member:any, index:any) => (
            <tr
              key={index}
              onClick={() => onSelect(member)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="py-1">{member.fullName}</td>
              <td>{member.designationData?.designation}</td>
              <td>{member.employeecode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamList;