import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editSubscriber } from '../../../../api/users'; // Import your action here
import { AppDispatch } from '../../../../store/store';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { EditKeySubscriber } from '../../../../Utility/FolmKeys/Subscriber/EditKeySubscriber';
import SubscriverHeader from './SubscriverHeader';
import { decrypt } from '../../../../Utils/PasswordDesc';
import { EditCompanySubscriberkey } from '../../../../Utility/FolmKeys/Subscriber/EditCompanySubscriberkey';

const Edituser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const singleSubscriber = useSelector((state: any) => state.subscriber.singleSubscriber);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const SingleSubscriber = useSelector((state: any) => state.subscriber.singleSubscriber);
  const [loder,setloder]=useState(false)

  // Redirect to home page if the subscriber ID does not match the URL parameter
  useEffect(() => {
    decryptPassword()
    if (singleSubscriber?._id !== userId) {
      navigate(`/`);
    }
  }, [singleSubscriber, navigate, userId]);

  const handleSubmit = async (val: any) => {
    try {
      setloder(true)
      // Make API call to edit the subscriber
      const payload:any={
        ...val,
        status:val.status=='Active'?true:false,
        _id:singleSubscriber._id
      }
      const response = await dispatch(editSubscriber(payload));

      if (response.payload === true) {
      setloder(false)

        navigate('/account-management/manage-subscriber');
      }
      setloder(false)

    } catch (error) {
      setloder(false)
      console.error('Error updating subscriber: ', error);
    }
  };
  
  const [userpassword,setuserpassword]=useState<any>("")
  const decryptPassword = async () => {
      if (SingleSubscriber?.password) {
        const password = await decrypt(SingleSubscriber.password);
        setuserpassword(password)
      }
    };
  return (
    <>
      <div className="my-3"></div>
      <SubscriverHeader SingleSubscriber={singleSubscriber} />


      <div className="my-3"></div>
      <div className="w-full">
        {userpassword?(
       <>
       {SingleSubscriber?.subscribeType === 'Individual' ? (
        <GlobalForm fields={EditKeySubscriber(singleSubscriber,userpassword)} handleSubmit={handleSubmit} buttontext="Submit" disabled={loder} />

        ):(
        <GlobalForm fields={EditCompanySubscriberkey(singleSubscriber,userpassword)} handleSubmit={handleSubmit} buttontext="Submit" disabled={loder}/>
        )}
       </>

        ):(null)}
      </div>
    </>
  );
};

export default Edituser;
