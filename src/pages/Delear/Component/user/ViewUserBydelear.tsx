import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ViewKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/ViewKeysSubscriber';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import ViewDelearDevice from '../Device/ViewDelearDevice';
import { useEffect, useState } from 'react';
import { decrypt } from '../../../../Utils/PasswordDesc';
import DeviceHeader from '../../../ManageUsers/Component/Devices/DeviceHeader';
import DelearDeviceHeader from '../Device/DelearDeviceHeader';
import { viewCompanySubscriberkey } from '../../../../Utility/FolmKeys/Subscriber/viewCompanySubscriberkey';

const ViewUserBydelear: React.FC = () => {
  const navigate = useNavigate();
  const SingleSubscriber = useSelector(
    (state: any) => state.subscriber.singleSubscriber,
  );
  const singleDelear = useSelector(
    (state: any) => state.subscriber.singleDelearUser,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  const handleSubmit = async (e: any) => {
    if (loginUser.permissions.Manage_Dealer?.Update  || loginUser.role=="SuperAdmin") {
      navigate(`/account-management/manage-subscriber/EdutUser-ByDelear/${SingleSubscriber._id}`);
    }
    return;
  };
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
  const PropsRecord = {
    subscriber: SingleSubscriber,
    delear: singleDelear,
  };
  return (
    <>
      <div className="my-3"></div>
      <DelearDeviceHeader sibglesubscriber={PropsRecord} />

      <div className="w-full">
        <div className="">
          {userpassword ? (
            <div>
              {SingleSubscriber.subscribeType == 'Company' ? (
                <GlobalForm
                  fields={viewCompanySubscriberkey(SingleSubscriber, userpassword)}
                  handleSubmit={handleSubmit}
                  buttontext="Edit Subscriber"
                  disabled={false}
                />
              ) : (
                <GlobalForm
                  fields={ViewKeySubscriber(SingleSubscriber, userpassword)}
                  handleSubmit={handleSubmit}
                  buttontext="Edit Subscriber"
                  disabled={false}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="my-4">
        {/* <CommonHeader  propsData={propsData} /> */}
        <ViewDelearDevice />
      </div>
    </>
  );
};

export default ViewUserBydelear;
