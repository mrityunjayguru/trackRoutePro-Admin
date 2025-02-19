import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../store/store';
import { editSubscriber } from '../../../../api/users';
import { decrypt } from '../../../../Utility/FolmKeys/Subscriber/EditKeySubscriber';
import { DviewCompanySubscriberkey } from '../../../../Utility/FolmKeys/DelearDashboardKey/DviewCompanySubscriberkey';
import { DViewKeySubscriber } from '../../../../Utility/FolmKeys/DelearDashboardKey/DViewKeysSubscriber';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import SubscriverHeader from '../../../ManageUsers/Component/Subscriber/SubscriverHeader';
import ListOfDevices from '../../../ManageUsers/Component/Devices/ListOfDevices';
import { DEditCompanySubscriberKey } from '../../../../Utility/FolmKeys/DelearDashboardKey/DEditCompanySubscriberKey';
import { DEditUserSubscriberKey } from '../../../../Utility/FolmKeys/DelearDashboardKey/DEditUserSubscriberKey';

const DealerEditSubscriber: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const SingleSubscriber = useSelector((state: any) => state.subscriber.singleSubscriber);
  
  const [userpassword, setUserPassword] = useState<string>('');

  useEffect(() => {
    decryptPassword();
  }, []);

  const decryptPassword = async () => {
    if (SingleSubscriber?.password) {
      const password = await decrypt(SingleSubscriber.password);
      setUserPassword(password);
    }
  };

  const handleSubmit = async (val: any) => {
    try {
      const payload = {
        ...val,
        status: val.status === 'Active',
        _id: SingleSubscriber._id,
      };
      
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
        {userpassword && (
          <GlobalForm
            fields={
              SingleSubscriber.subscribeType === 'Company'
                ? DEditCompanySubscriberKey(SingleSubscriber, userpassword)
                : DEditUserSubscriberKey(SingleSubscriber, userpassword)
            }
            handleSubmit={handleSubmit}
            buttontext="Submit"
            disabled={false}
          />
        )}
      </div>
      <div className="my-4">
        <ListOfDevices />
      </div>
    </>
  );
};

export default DealerEditSubscriber;
