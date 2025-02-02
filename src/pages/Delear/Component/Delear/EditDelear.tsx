import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ViewKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/ViewKeysSubscriber';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import CommonHeader from '../../../../common/CommonHeader';
import SubscriberlistByDelear from '../user/SubscriberlistByDelear';
import {
  decrypt,
  EditDelearKey,
} from '../../../../Utility/FolmKeys/Dealear/EditDelearKey';
import { editSubscriber } from '../../../../api/users';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { useEffect, useState } from 'react';
const EditDelear: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loder, setloder] = useState(false);

  const SingleSubscriber = useSelector(
    (state: any) => state.subscriber.singleDelearUser,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  const handleSubmit = async (val: any) => {
    try {
      setloder(true);
      // Make API call to edit the subscriber
      const payload: any = {
        ...val,
        status: val.status == 'Active' ? true : false,
        _id: SingleSubscriber._id,
      };
      const response = await dispatch(editSubscriber(payload));

      if (response.payload === true) {
        setloder(false);

        navigate('/account-management/manage-dealer');
      }
    setloder(false);

    } catch (error) {
      setloder(false);

      console.error('Error updating subscriber: ', error);
    }
  };
  const propsData = {
    title: 'List of All Subscribers',
    button: 'Add New +',
    redirect: 'AddSubscriberByDelear',
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
  return (
    <>
      <div className="my-3"></div>
      <div className="w-full">
        <div className="">
          {userpassword ? (
            <GlobalForm
              fields={EditDelearKey(SingleSubscriber, userpassword)}
              handleSubmit={handleSubmit}
              buttontext="Edit Subscriber"
              disabled={loder}
            />
          ) : null}
        </div>
      </div>

      <div className="my-4">
        <CommonHeader propsData={propsData} />
        <SubscriberlistByDelear />
      </div>
    </>
  );
};

export default EditDelear;
