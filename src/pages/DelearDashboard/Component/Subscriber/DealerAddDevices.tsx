import { useState, useEffect } from 'react';
// import OtherDetails from '../OtherDetails';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { vehicleFields } from '../../../../Utility/FolmKeys/Devices/Devices';
import { getDeviceType } from '../../../../api/DeviceType';
import DeviceHeader from '../../../ManageUsers/Component/Devices/DeviceHeader';
import { DealervehicleFields } from '../../../../Utility/FolmKeys/AppDealer/Device/AddDevice';
// import DeviceHeader from './DeviceHeader';
interface VehicleType {
  _id: string;
  icons: string;
  vehicleTypeName: string;
}
const DealerAddDevices = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [owner, setOwner] = useState<{ Name?: string; _id?: string }>({});
  const [vehicletypes, setVehicleType] = useState<VehicleType[]>([]);
  const data = useSelector((state: any) => state.vehicletype.vehicleType);
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye?.deviceType,
  );
  const [loder,setloder]=useState(false)
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setVehicleType(data);
    setOwner(data2);
  }, [data, data2]);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const getVehicleType = async () => {
    try {
      const vehiclepayload:any={
        status:"Active"
      }
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
      createdDelearId:loginUser._id,
      delearid: loginUser._id,
      dealerCode:loginUser._id,
      status: val.deviceStatus,
      fule: val.fuelStatus == 'of' ? false : true,
      ownerID: data2?._id,
      isAppCreated: true,

    };

    let responce=await dispatch(addDevice(payload));
    if(responce.payload){
      navigate("/DealearDashboard")
    }
    setErrors({});
    setloder(false)

  };
 
const PropsRecord={
...data2
}
  return (
    <div className="w-full">
      <DeviceHeader  sibglesubscriber={PropsRecord}/>

      <div className="my-5">
        <GlobalForm
          fields={DealervehicleFields(devicetypeDetails, DealerRecord)}
          handleSubmit={handleSubmit}
          disabled={loder} buttontext={'Submit'}        />
      </div>
    </div>
  );
};

export default DealerAddDevices;
