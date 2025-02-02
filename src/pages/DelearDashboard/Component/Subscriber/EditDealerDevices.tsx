import { useState, useEffect } from 'react';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { updateDevices } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { editDeviceKeys } from '../../../../Utility/FolmKeys/Devices/editDeviceKeys';
import { getDeviceType } from '../../../../api/DeviceType';
import { AppDeviceViewKey } from '../../../../Utility/FolmKeys/AppDealer/Device/AppDeviceViewKey';
import { AppDeviceEditKeys } from '../../../../Utility/FolmKeys/AppDealer/Device/AppDeviceEditKeys';
// import DeviceHeader from './DeviceHeader';

const EditDealerDevices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const VehiclwType = useSelector((state: any) => state.vehicletype.vehicleType);
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const singleUserDevice = useSelector((state: any) => state.subscriber.singleDevice);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const [owner, setOwner] = useState<{ uniqueID?: string; _id?: string }>({});
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye.deviceType,
  );
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  // Fetch vehicle types on mount
  useEffect(() => {
    const getVehicleType = async () => {
      const payload:any={
        status:"Active"
      }
      try {
        await dispatch(fetchVehicleType(payload));
      } catch (err) {
        console.error(err);
      }
    };
    getVehicleType();
  }, [dispatch]);



  const handleSubmit = async (val: any) => {
    // Clone the val object to avoid mutation
    let payload: any = { ...val };
    // Convert displayParameters array into an object with keys as the parameters and values as true
    if (payload.displayParameters && Array.isArray(payload.displayParameters)) {
      const displayParametersObject = payload.displayParameters.reduce((acc: any, param: string) => {
        acc[param] = true;
        return acc;
      }, {});
  
      // Assign the newly created object to displayParameters key
      payload.displayParameters = displayParametersObject;
      payload._id=singleUserDevice._id
    }
  
    await dispatch(updateDevices(payload));

  };
  

  const getDates = (mydate: any): string => {
    const date = new Date(mydate);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // Formats to "11 Jan 2024"
  };


  const formattedVehicleTypes = VehiclwType?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName,
    value: vehicle._id,
    icon: vehicle.icons,
  }));
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
 
  return (
    <div className="w-full">
            {/* <DeviceHeader sibglesubscriber={PropsRecord}  /> */}
      <div className="my-5 ">
        <GlobalForm fields={AppDeviceEditKeys(singleUserDevice, formattedVehicleTypes, devicetypeDetails, DealerRecord)} handleSubmit={handleSubmit} buttontext="" disabled={false} />

        {/* Subscription Expiry and Renewal */}
        {/* <div className="py-2 px-5 flex gap-24">
          <div>
            <p className="textred font-bold text-[12px]">Subscription Expire</p>
            <h1 className="text-[#000] font-bold text-[14px]">
              {singleUserDevice?.subscriptionexp ? getDates(singleUserDevice.subscriptionexp) : "-"}
            </h1>
          </div>
         
        </div> */}
      </div>
    </div>
  );
};

export default EditDealerDevices;
