import { useState, useEffect } from 'react';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { GetDealearRecord, manageSingleDevices } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { ViewDeviceKeys } from '../../../../Utility/FolmKeys/Devices/ViewDeviceKey';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { getDeviceType } from '../../../../api/DeviceType';
import DeviceHeader from './DeviceHeader';
import ListOfDevices from './ListOfDevices';
import ExpiryComponent from '../../../../common/ExpiryComponent';
interface VehicleType {
  _id: string;
  icons: string;
  vehicleTypeName: string;
}

const VeiwDevices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const VehiclwType = useSelector(
    (state: any) => state.vehicletype.vehicleType,
  );
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const singleDevices = useSelector(
    (state: any) => state.subscriber.singleDevice,
  );
  const allDevices = useSelector((state: any) => state.subscriber.userDevices);

 
  const [owner, setOwner] = useState<{ uniqueID?: string; _id?: string }>({});
  const DealerRecord = useSelector((state: any) => state?.subscriber?.DelearCode);

  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye?.deviceType,
  );
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const getVehicleType = async () => {
    const payload: any = {};
    try {
     await dispatch(GetDealearRecord(payload));
      await dispatch(fetchVehicleType(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVehicleType();
  }, [dispatch]);

  const handleSubmit = async () => {
    navigate('/account-management/devices/edit-devices');
  };

  const reniewsubscribes = () => {
    localStorage.setItem('ownerid', data2._id);
    navigate('/manage/deviceList');
  };
  // Handler for the change event
  


  const formattedVehicleTypes = VehiclwType?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName, // Use the name of the vehicle type as label
    value: vehicle._id, // Convert to lowercase and replace spaces with dashes
    icon: vehicle.icons, // Assuming the icon filename is stored in `icons`
  }));
  const getDeviceTypes = async () => {
    try {
      const payload: any = {};
   await dispatch(getDeviceType(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDeviceTypes();
  }, []);
  const PropsRecord = {
    ...data2,
    ...singleDevices,
  };
 
  return (
    <>
      <div className="w-full p-5">
        <DeviceHeader sibglesubscriber={PropsRecord} />
        <div className="my-5 p-2 ">
          <GlobalForm
            fields={ViewDeviceKeys(
              singleDevices,
              formattedVehicleTypes,
              devicetypeDetails,
              DealerRecord
            )}
            handleSubmit={handleSubmit}
            buttontext="Edit Device" disabled={false}          />


<ExpiryComponent singleDevices={singleDevices} />


         
          <div className="mt-20">
            {/* <OtherDetails /> */}
            <ListOfDevices />
          </div>
        </div>
      </div>
    </>
  );
};

export default VeiwDevices;
