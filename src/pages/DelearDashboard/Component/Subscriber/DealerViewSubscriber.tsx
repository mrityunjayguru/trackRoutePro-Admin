import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ViewKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/ViewKeysSubscriber';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import SubscriverHeader from '../../../ManageUsers/Component/Subscriber/SubscriverHeader';
import DealerlistOfDevices from './DealerlistOfDevices';
import { decrypt } from '../../../../Utils/PasswordDesc';
import { useEffect, useState } from 'react';
import { viewCompanySubscriberkey } from '../../../../Utility/FolmKeys/Subscriber/viewCompanySubscriberkey';
import { DViewKeySubscriber } from '../../../../Utility/FolmKeys/DelearDashboardKey/DViewKeysSubscriber';
import { DviewCompanySubscriberkey } from '../../../../Utility/FolmKeys/DelearDashboardKey/DviewCompanySubscriberkey';

const DealerViewSubscriber: React.FC = () => {
  const navigate = useNavigate();
  const SingleSubscriber = useSelector(
    (state: any) => state.subscriber.singleSubscriber,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const handleSubmit = async (e: any) => {

    navigate(`/DealerEditSubscriber`);
    return;
  };
  useEffect(() => {
    decryptPassword();
  }, []);
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
        {userpassword ? (
          <div className="">
            {SingleSubscriber.subscribeType == 'Company' ? (
              <GlobalForm
                fields={DviewCompanySubscriberkey(
                  SingleSubscriber,
                  userpassword,
                )}
                handleSubmit={handleSubmit}
                buttontext={SingleSubscriber.isView===true?"Edit Subscriber":""}
                disabled={false}
              />
            ) : (
              <GlobalForm
                fields={DViewKeySubscriber(SingleSubscriber, userpassword)}
                handleSubmit={handleSubmit}
                buttontext={SingleSubscriber.isView===true?"Edit Subscriber":""}
                disabled={false}
              />
            )}
          </div>
        ) : null}
      </div>

      <div className="my-4">
        <DealerlistOfDevices />
      </div>
    </>
  );
};

export default DealerViewSubscriber;
