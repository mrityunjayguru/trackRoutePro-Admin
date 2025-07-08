import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import {
  getLeave,
  updateLeaveStatus,
} from '../../../../../api/ecomm/salesTeam';

const ApplicationTable = () => {
  const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: any) => state.Auth?.loginUserData);

  const leavedata = useSelector((state: any) => state.slesTeame?.leave || []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const payload: any = {};
       if(data?.designation?.designation=="TSL"){
        Object.assign(payload,{role:"TSL"})
        Object.assign(payload,{_id:data?._id})
      }
    await dispatch(getLeave(payload));
  };
  const handleStatusChange = async (
    id: string,
    status: 'Approved' | 'Denied',
  ) => {
    const payload: any = {
      _id: id,
      leaveStatus: status,
    };
    await dispatch(updateLeaveStatus(payload));
    await getData();
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md font-sans">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Manage Leave Applications
      </h2>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    Employee Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    Actions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                    Leave Stats
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leavedata.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-4 text-center text-sm text-gray-500"
                    >
                      No leave applications found.
                    </td>
                  </tr>
                ) : (
                  leavedata.map((application: any, index: number) => (
                    <tr
                      key={application._id}
                      className={`${
                        index % 2 === 1 ? 'bg-blue-50' : 'bg-white'
                      } hover:bg-gray-100 transition-colors duration-200`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 sm:px-6">
                        {application.user?.fullName || 'N/A'}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 sm:px-6">
                        {application.user?.employeecode || 'N/A'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 sm:px-6">
                        {application?.startTime
                          ? new Date(application.startTime).toLocaleDateString(
                              'en-IN',
                              {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              },
                            )
                          : 'N/A'}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium sm:px-6">
                        <button
                          className="text-green-600 hover:text-green-900 mr-4 font-semibold"
                          onClick={() =>
                            handleStatusChange(application._id, 'Approved')
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 font-semibold"
                          onClick={() =>
                            handleStatusChange(application._id, 'Denied')
                          }
                        >
                          Deny
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 sm:px-6">
                        {application.leaveStatus || 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTable;
