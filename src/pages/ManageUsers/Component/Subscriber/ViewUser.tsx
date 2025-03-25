import { useEffect, useState } from 'react';
import ListOfDevices from '../Devices/ListOfDevices';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import SubscriverHeader from './SubscriverHeader';
import { ViewKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/ViewKeysSubscriber';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { decrypt } from '../../../../Utils/PasswordDesc';
import { viewCompanySubscriberkey } from '../../../../Utility/FolmKeys/Subscriber/viewCompanySubscriberkey';

const Editusr: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const SingleSubscriber = useSelector(
    (state: any) => state.subscriber.singleSubscriber,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  // Check if the SingleSubscriber is loaded and ensure the userId matches
  useEffect(() => {
    decryptPassword();
    if (SingleSubscriber?._id !== userId) {
      navigate(`/`);
    }
  }, [SingleSubscriber, navigate, userId]);

  const handleSubmit = async (e: any) => {
    if (
      loginUser.permissions.Manage_User?.Update === true ||
      loginUser.role == 'SuperAdmin'
    ) {
      navigate(
        `/account-management/manage-subscriber/Edit-subscriber/${SingleSubscriber._id}`,
      );
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
  return (
    <>
      <div className="my-3"></div>
      <SubscriverHeader SingleSubscriber={SingleSubscriber} />
      <div className="w-full">
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

      <div className="my-4">
        <ListOfDevices />
      </div>
    </>
  );
};

export default Editusr;
