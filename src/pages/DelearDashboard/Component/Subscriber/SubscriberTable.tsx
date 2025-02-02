import { useDispatch, useSelector } from 'react-redux';
import { formatDateToDDMMMYYYYwithTime } from '../../../../common/ManageDate';
import { useNavigate } from 'react-router-dom';
import { singleSubscribers } from '../../../../api/users';
import { AppDispatch } from '../../../../store/store';
const SubscriberTable = () => {
  const Subscriber = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  const dispatch=useDispatch<AppDispatch>()
  const navigate=useNavigate()
  const handleManage=(val:any)=>{
      const payload: any = val;
      dispatch(singleSubscribers(payload));
    navigate("/DealerViewSubscriber")
  }
  return (
    <div className="p-6">
      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Subscriber?.map((card: any, i: number) => (
          <div
            key={card.id}
            className={`${
              card.subscribeType === 'Individual'
                ? 'bg-[#EDF7FD]'
                : 'bg-[#FFF4F5]'
            } border rounded-lg shadow-md text-left`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{`#${i + 1} ${
                  card.Name
                }`}</h2>
                <span
                  className={`px-2 py-1 text-sm font-medium rounded-md ${
                    card.type === 'Individual'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-purple-200 text-purple-800'
                  }`}
                >
                  {card?.subscribeType}
                </span>
              </div>

              <p
                className={`text-sm flex items-center mt-2 ${
                  card.status === true ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <span className="mr-2">
                  {card.status === true ? '⚡' : '🔴'}
                </span>
                Status: {card.status ? 'Active' : 'InActive'}
              </p>

              <p className="mt-2 text-gray-600">{card.emailAddress}</p>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Location:</strong> {card.address}
                </p>
                <p>
                  <strong>Total Devices:</strong> {card.userDevicesCount}
                </p>
                <p>
                  <strong>Reg. Date:</strong>{' '}
                  {formatDateToDDMMMYYYYwithTime(card.createdAt)}
                </p>
              </div>
            </div>

            {/* Manage Button */}
            <button onClick={()=>handleManage(card)} className="  mt-4 w-full bg-[#000000] text-[#D9E821] py-2 rounded-br-[10px] rounded-bl-[10px]  ">
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriberTable;
