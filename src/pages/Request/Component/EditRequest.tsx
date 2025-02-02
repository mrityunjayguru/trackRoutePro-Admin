import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GlobalForm from '../../../GlobalForm/GlobalForm';
import SubscriverHeader from '../../ManageUsers/Component/Subscriber/SubscriverHeader';
import { editSubscriber } from '../../../api/users';
import { AppDispatch } from '../../../store/store';
import {
  decrypt,
  EditKeySubscriber,
} from '../../../Utility/FolmKeys/Subscriber/EditKeySubscriber';
import ViewRequesteader from './ViewRequesteader';
import { useEffect, useState } from 'react';

const EditRequest: React.FC = () => {
  const navigate = useNavigate();
  const SingleSubscriber = useSelector(
    (state: any) => state.subscriber.singleSubscriber,
  );
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
  // Check if the SingleSubscriber is loaded and ensure the userId matches
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (val: any) => {
    try {
      const payload: any = {
        ...val,
        status: val.status == 'Active' ? true : false,
        _id: SingleSubscriber._id,
      };
      const response = await dispatch(editSubscriber(payload));

      if (response.payload === true) {
        navigate('/support/dealers');
      }
    } catch (error) {
      console.error('Error updating subscriber: ', error);
    }
  };
  const PropsRecord = {
    subscriber: SingleSubscriber,
  };

  return (
    <>
      <div className="my-3"></div>
      <ViewRequesteader SingleSubscriber={PropsRecord} />

      <div className="w-full mt-3">
        <div className="">
          {userpassword?( <GlobalForm
            fields={EditKeySubscriber(SingleSubscriber, userpassword)}
            handleSubmit={handleSubmit}
            buttontext="Submit"
            disabled={false}
          />):(null)}
         
        </div>
      </div>
    </>
  );
};

export default EditRequest;
