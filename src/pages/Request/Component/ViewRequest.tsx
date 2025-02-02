import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import SubscriverHeader from './SubscriverHeader';
import { ViewKeySubscriber } from '../../../Utility/FolmKeys/Subscriber/ViewKeysSubscriber';
import GlobalForm from '../../../GlobalForm/GlobalForm';
import SubscriverHeader from '../../ManageUsers/Component/Subscriber/SubscriverHeader';
import { AppDispatch } from '../../../store/store';
import LogPopup from '../../../common/LogPopup';
// import { decrypt } from '../../../../Utils/PasswordDesc';
import { decrypt } from '../../../Utils/PasswordDesc';
import { viewCompanySubscriberkey } from '../../../Utility/FolmKeys/Subscriber/viewCompanySubscriberkey';
import DelearDeviceHeader from '../../Delear/Component/Device/DelearDeviceHeader';
import SubscriberHeader from '../../ManageUsers/Component/Subscriber/SubscriverHeader';
import ViewRequesteader from './ViewRequesteader';

const ViewRequest: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const SingleSubscriber = useSelector(
    (state: any) => state.subscriber.singleSubscriber,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  // Check if the SingleSubscriber is loaded and ensure the userId matches
  const dispatch = useDispatch<AppDispatch>();
  const [userpassword, setuserpassword] = useState<any>('');
  const decryptPassword = async () => {
    if (SingleSubscriber?.password) {
      const password = await decrypt(SingleSubscriber.password);
      setuserpassword(password);
    }
  };
  useEffect(() => {
    decryptPassword();
  }, []);
  const handleSubmit = async (val: any) => {
    // Make API call to edit the subscriber
    navigate('/EditRequest');
  };
  const PropsRecord = {
    subscriber: SingleSubscriber,
  };
  return (
    <>
      <div className="my-3"></div>
      {/* <LogPopup/> */}

      <div className="">
      <ViewRequesteader SingleSubscriber={PropsRecord} />
      </div>
      <div className="w-full mt-3">
        <div className="">
          {userpassword ? (
            <>
              {SingleSubscriber?.subscribeType === 'Individual' ? (
                <GlobalForm
                  fields={ViewKeySubscriber(SingleSubscriber, userpassword)}
                  handleSubmit={handleSubmit}
                  buttontext="Edit Subscriber"
                  disabled={false}
                />
              ) : (
                <GlobalForm
                  fields={viewCompanySubscriberkey(
                    SingleSubscriber,
                    userpassword,
                  )}
                  handleSubmit={handleSubmit}
                  buttontext="Edit Subscriber"
                  disabled={false}
                />
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ViewRequest;
