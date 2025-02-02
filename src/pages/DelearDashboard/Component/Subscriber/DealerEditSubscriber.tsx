import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import {  ViewKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/ViewKeysSubscriber';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import SubscriverHeader from '../../../ManageUsers/Component/Subscriber/SubscriverHeader';
import ListOfDevices from '../../../ManageUsers/Component/Devices/ListOfDevices';
import { editSubscriber } from '../../../../api/users';
import { AppDispatch } from '../../../../store/store';
import { EditKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/EditKeySubscriber';

const DealerEditSubscriber: React.FC = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch<AppDispatch>()
  const SingleSubscriber = useSelector((state: any) => state.subscriber.singleSubscriber);

  const handleSubmit = async (val: any) => {
    try {
      // Make API call to edit the subscriber
      const payload:any={
        ...val,
        status:val.status=='Active'?true:false,
        _id:SingleSubscriber._id
      }
      const response = await dispatch(editSubscriber(payload));

      if (response.payload === true) {
        navigate('/DealearDashboard');
      }
    } catch (error) {
      console.error('Error updating subscriber: ', error);
    }
  };

  return (
    <>
      <div className="my-3"></div>
      <SubscriverHeader SingleSubscriber={SingleSubscriber} />
      <div className="w-full">
        <div className="">
          <GlobalForm fields={EditKeySubscriber(SingleSubscriber)} handleSubmit={handleSubmit} buttontext="Edit Subscriber" />
        </div>
      </div>

      <div className="my-4">
        <ListOfDevices />
      </div>
    </>
  );
};

export default DealerEditSubscriber;
