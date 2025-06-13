import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addSlesAppNotification, getSalesAppnotification } from '../../../../api/salesApp/Notification';

const NotificationTable = () => {
  // Sample data for the table
  const notifications:any = [
    { id: 1, title: 'New Sales Target Update', sentOn: '15/6/2025' },
    { id: 2, title: 'Eid Holiday Canceled', sentOn: '15/5/2025' },
    { id: 3, title: 'Diwali Sale Code is Active Now', sentOn: '15/4/2025' },
  ];
const dispatch=useDispatch<AppDispatch>()
  // Function to handle view action (for demonstration)
  const handleView = (id:any) => {
    alert(`Viewing notification with ID: ${id}`);
    // In a real application, this would open a modal or navigate to a detail page
  };
  const getData=async()=>{
    const payload:any={}
    try{
          await dispatch(getSalesAppnotification(payload))
    }
    catch(err){

  }
  }
useEffect(()=>{
getData()
},[])
  const NotificationData=useSelector((state:any)=>state.salesAppNotification?.NotificationData)
  console.log(NotificationData,"NotificationDataNotificationData")
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Sent Notifications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
               message
              </th>
               <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
               createdAt
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {NotificationData?.map((notification:any) => (
              <tr key={notification.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {notification.notificationTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {notification.message}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {notification.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleView(notification.id)}
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-2"
                    aria-label={`View ${notification.title}`}
                  >
                    {/* Eye icon from Lucide React or similar, here using inline SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationTable
