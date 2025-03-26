import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import CommonHeader from '../../../../common/CommonHeader';
import SubscriberlistByDelear from '../user/SubscriberlistByDelear';
import { decrypt, ViewDealerKey } from '../../../../Utility/FolmKeys/Dealear/ViewDealerKey';
import CodeComponent from '../../CodeComponent';
import { useEffect, useState } from 'react';
const ViewDelear: React.FC = () => {
  const navigate = useNavigate();
  const SingleSubscriber = useSelector(
    (state: any) => state.subscriber.singleDelearUser,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  const handleSubmit = async (e: any) => {
    if(!loginUser?.permissions?.Manage_Dealer?.Add && loginUser?.role!=="SuperAdmin") return
    navigate(`/EditDelear`);
  };
  const propsData = {
    title: 'List of All Subscribers',
    redirect: 'AddSubscriberByDelear',
  };
  if(loginUser?.permissions?.Manage_Dealer?.Add || loginUser?.role=="SuperAdmin"){
    Object.assign(propsData,{button:"Add New"})
  }
    const [userpassword,setuserpassword]=useState<any>("")
    const decryptPassword = async () => {
        if (SingleSubscriber?.password) {
          const password = await decrypt(SingleSubscriber.password);
          setuserpassword(password)
        }
      };
      useEffect(()=>{
        decryptPassword()
      },[])
  return (
    <>
  <CodeComponent SingleSubscriber={SingleSubscriber}/>

      <div className="w-full mt-2">
        <div className="">
          {userpassword?(
              <GlobalForm
              fields={ViewDealerKey(SingleSubscriber, userpassword)}
              handleSubmit={handleSubmit}
              buttontext="Edit Subscriber" disabled={false}            />
          ):(null)}
        
        </div>
      </div>

      <div className="my-4">
        <CommonHeader propsData={propsData} />
        <SubscriberlistByDelear />
      </div>
    </>
  );
};

export default ViewDelear;
