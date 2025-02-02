import { useSelector } from 'react-redux';
import { formatDateToDDMMMYYYYwithDate } from '../../../../../common/ManageDate';
const ExistingUserDetail = () => {
  const existingUser = useSelector((state: any) => state.subscriber.singleSubscriber);
  return (
    <div className="table-container">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#EDEDED] text-gray-700 font-semibold text-base">
          <tr>
            <th className="p-1 text-center text-[#949495] text-sm">Name</th>
            <th className="p-1 text-center text-[#949495] text-sm">Phone</th>
            <th className="p-1 text-center text-[#949495] text-sm">Email</th>
            <th className="p-1 text-center text-[#949495] text-sm">Reg. Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
                <tr className="text-black border-b border-[#D9E821] text-center text-[15px] font-medium">
                  <td className="p-1 border-b border-[#D9E821]">{existingUser?.Name}</td>
                  <td className="p-1 border-b border-[#D9E821]">{existingUser?.phone}</td>
                  <td className="p-1 border-b border-[#D9E821]">{existingUser?.emailAddress}</td>
                  <td className="p-1 border-b border-[#D9E821]">{formatDateToDDMMMYYYYwithDate(existingUser?.createdAt)}</td>
                </tr>
        
        </tbody>
      </table>
    </div>
  );
};

export default ExistingUserDetail;
