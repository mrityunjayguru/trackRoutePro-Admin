import { useEffect, useState } from 'react';
import { AddSubscriber, Getsubscribers } from '../../../../api/users';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { AddSubscriberKey } from '../../../../Utility/FolmKeys/Subscriber/Subscriber';
import { AddCompanySubscriber } from '../../../../Utility/FolmKeys/Subscriber/AddCompanySubscriber';
import { vehicleFields } from '../../../../Utility/FolmKeys/Devices/Devices';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { AddDealear } from '../../../../Utility/FolmKeys/Dealear/AddDealear';
import GlobalForm from '../../../../GlobalForm/GlobalForm';

const AddDelear: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loder,setloder]=useState(false)

  // Selectors
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const vehicleTypeData = useSelector(
    (state: any) => state.vehicletype.vehicleType,
  );
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye?.deviceType,
  );
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );

  const [subscriberType, setSubscriberType] = useState('Dealer');

  // Fetch vehicle types and dealer subscribers
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const payload: any = { filter: 'Dealer' };
        await dispatch(fetchVehicleType(payload));
        await dispatch(Getsubscribers(payload));
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();
  }, []);

  // Store vehicle type data in local storage
  useEffect(() => {
    localStorage.setItem('vehicleTypeData', JSON.stringify(vehicleTypeData));
  }, [vehicleTypeData]);

  // Redirect if user doesn't have permission
  useEffect(() => {
    if (loginUser.permissions?.Subscribers?.Add === false) {
      // navigate('/');
    }
  }, [loginUser, navigate]);

  const handleSubmit = async (formData: any) => {
    const payload = {
      ...formData,
      subscribeType: subscriberType,
      status: formData.status === 'Active' ? true : false,
    };
    setloder(true)
    if (subscriberType == 'Dealer') {
      Object.assign(payload, { role: 'Dealer' });
    } else {
      Object.assign(payload, { role: 'User' });
    }
    const response = await dispatch(AddSubscriber(payload));
    if (response.payload) {
    setloder(false)
      navigate('/account-management/manage-dealer');
    }
    setloder(false)

  };

  // Render fields based on subscriber type
  const renderFormFields = () => {
    if (subscriberType === 'Individual') {
      return (
        <GlobalForm
          fields={AddSubscriberKey}
          handleSubmit={handleSubmit}
          buttontext=""
          disabled={loder}
        />
      );
    }
    if (subscriberType === 'Company') {
      return (
        <GlobalForm
          fields={AddCompanySubscriber(DealerRecord)}
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
        <div className="mt-3 border-b-2 border-[#D9E821]"></div>
      </div>

      <div className="w-full">
        {renderFormFields()}

        {/* Add First Vehicle section */}
        {subscriberType !== 'Dealer' && (
          <>
            <div className="border-b-2 border-[#D9E821] my-4">
              <h2 className="font-semibold text-[#000] py-3">
                Add First Vehicle
              </h2>
            </div>
            <GlobalForm
              fields={vehicleFields(devicetypeDetails, DealerRecord)}
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

export default AddDelear;
