import { useEffect, useState } from 'react';
import { AddSubscriber, Getsubscribers } from '../../../../api/users';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { AddDealear } from '../../../../Utility/FolmKeys/Dealear/AddDealear';
import { DealervehicleFields } from '../../../../Utility/FolmKeys/AppDealer/Device/AddDevice';
import { AppSubscriber } from '../../../../Utility/FolmKeys/AppDealer/Subscriber/AppSubscriber';
import { AppAddCompanuS } from '../../../../Utility/FolmKeys/AppDealer/Company/AppAddCompanuS';
import { getDeviceType } from '../../../../api/DeviceType';

const DealerAddSubscriber: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const vehicleTypeData = useSelector(
    (state: any) => state.vehicletype.vehicleType,
  );
  const [loder,setloder]=useState(false)
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye?.deviceType,
  );
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );

  const [subscriberType, setSubscriberType] = useState('Individual');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const payload: any = { role: 'Dealer' };
        const payload1:any={
          status:"Active"
        }
        await dispatch(fetchVehicleType(payload1));
        await dispatch(Getsubscribers(payload));
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    localStorage.setItem('vehicleTypeData', JSON.stringify(vehicleTypeData));
  }, [vehicleTypeData]);

  const handleSubmit = async (formData: any) => {
    setloder(true)
    const payload = {
      ...formData,
      isAppCreated: true,
      createdDelearId: loginUser._id,
      delearid: loginUser._id,
      isApproved:false,
      dealerCode:loginUser._id,
      subscribeType: subscriberType,
      status:false,
    };
    if (subscriberType == 'Dealer') {
      Object.assign(payload, { role: 'Dealer' });
    } else {
      Object.assign(payload, { role: 'User' });
    }
  try{
    const response = await dispatch(AddSubscriber(payload));
    if (response.payload) {
    setloder(false)

      navigate('/DealearDashboard');
    }
    setloder(false)

  }catch(error){
    setloder(false)

  }
  };
    const getDeviceTypes = async () => {
      try {
        const payload: any = {
        };
        const response: any = await dispatch(getDeviceType(payload));
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(() => {
      getDeviceTypes();
    }, []);
    const handlechangetype=(type:any)=>{
      setSubscriberType(type)
    }
    const renderFormFields = () => {
      if (subscriberType === 'Individual') {
        return (
          <GlobalForm
            fields={AppSubscriber}  // Make sure dob is included only here
            handleSubmit={handleSubmit}
            buttontext=""
            disabled={loder}
          />
        );
      }
      if (subscriberType === 'Company') {
        return (
          <GlobalForm
            fields={AppAddCompanuS(DealerRecord)}  // Ensure dob is not included here
            handleSubmit={handleSubmit}
            buttontext=""
            disabled={loder}
          />
        );
      }
      if (subscriberType === 'Dealer') {
        return (
          <GlobalForm
            fields={AddDealear}
            handleSubmit={handleSubmit}
            buttontext="Add Dealer"
            disabled={loder}
          />
        );
      }
      return null;
    };
    
  return (
    <>
      <div className="my-3">
        <div className="flex flex-row gap-3 ">
          {['Individual'].map((type) => (
            <button
              key={type}
              onClick={() => handlechangetype(type)}
              className={`rounded-xl font-bold px-10 py-2 ${
                subscriberType === type ? '  text-[#D9E821]' : 'text-[#000] '
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="mt-3 border-b-2 border-[#D9E821]"></div>
      </div>

      <div className="w-full">
        {renderFormFields()}

        {subscriberType !== 'Dealer' && (
          <>
            <div className="border-b-2 border-[#D9E821] my-4">
              <h2 className="font-semibold text-[#000] py-3">
                Add First Vehicle
              </h2>
            </div>
            <GlobalForm
              fields={DealervehicleFields(devicetypeDetails, DealerRecord)}
              handleSubmit={handleSubmit}
              buttontext="Submit and Add"
              disabled={loder}

            />
          </>
        )}
      </div>
    </>
  );
};

export default DealerAddSubscriber;
