import { useState, useEffect } from 'react';
// import OtherDetails from '../OtherDetails';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice, GetDealearRecord } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { vehicleFields } from '../../../../Utility/FolmKeys/Devices/Devices';
import { getDeviceType } from '../../../../api/DeviceType';
import DeviceHeader from '../../../ManageUsers/Component/Devices/DeviceHeader';
import DelearDeviceHeader from './DelearDeviceHeader';
import { DelearDeviceKey } from '../../../../Utility/FolmKeys/Devices/DelearDeviceKey';
// import DeviceHeader from './DeviceHeader';
interface VehicleType {
  _id: string;
  icons: string;
  vehicleTypeName: string;
}
const AddDevicesByDelear = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [owner, setOwner] = useState<{ Name?: string; _id?: string }>({});
  const [vehicletypes, setVehicleType] = useState<VehicleType[]>([]);
  const data = useSelector((state: any) => state.vehicletype.vehicleType);
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const [loder, setloder] = useState(false);

  const singleDelear = useSelector(
    (state: any) => state.subscriber.singleDelearUser,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye?.deviceType,
  );
  const DealerRecord = useSelector((state: any) => state?.subscriber?.DelearCode);

  const navigate = useNavigate();

  useEffect(() => {
    setVehicleType(data);
    setOwner(data2);
  }, [data, data2]);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const getVehicleType = async () => {
    try {
      const payload: any = {};
      const vehiclepayload:any={
        status:"Active"
      }
     await dispatch(GetDealearRecord(payload));
      
      await dispatch(fetchVehicleType(vehiclepayload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVehicleType();
  }, [dispatch]);

  const handleSubmit = async (val: any) => {
    const displayParameters = val.displayParameters.reduce((obj:any, key:any) => {
      obj[key] = true;
      return obj;
    }, {});
    setloder(true)
    const payload: any = {
      ...val,
      displayParameters,
      delearid:singleDelear._id,
      status: val.deviceStatus,
      fule: val.fuelStatus == 'of' ? false : true,
      ownerID: data2?._id,
    };

   let responce:any= await dispatch(addDevice(payload));
   if(responce.payload){
    setloder(false)
    navigate("/account-management/manage-dealer")
   }
    setloder(false)

    setErrors({});
  };

  useEffect(() => {
    if (
      loginUser &&
      loginUser.permissions?.Device?.Add === false &&
      loginUser.role !== 'SuperAdmin'
    ) {
      navigate('/');
    }
  }, [loginUser, navigate]);

  // Fetching device types
  const PropsRecord = {
    subscriber:data2,
    delear:singleDelear
   
  };

  return (
    <div className="w-full">
           <DelearDeviceHeader sibglesubscriber={PropsRecord} />
      <div className="my-5">
        <GlobalForm
          fields={DelearDeviceKey(devicetypeDetails,DealerRecord)}
          handleSubmit={handleSubmit}
          buttontext="Add Device"
          disabled={loder}
        />
      </div>
    </div>
  );
};

export default AddDevicesByDelear;
