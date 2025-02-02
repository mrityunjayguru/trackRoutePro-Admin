import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import DeviceHeader from './DeviceHeader';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { addDevice, GetDealearRecord } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { vehicleFields } from '../../../../Utility/FolmKeys/Devices/Devices';

interface VehicleType {
  _id: string;
  icons: string;
  vehicleTypeName: string;
}

const AddDevices = () => {
  // Redux dispatch and navigation
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Component state
  const [owner, setOwner] = useState<{ Name?: string; _id?: string }>({});
  const [vehicletypes, setVehicleType] = useState<VehicleType[]>([]);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [userCode, setUserCode] = useState<any>(null);
  const [loder,setloder]=useState(false)

  // Redux selectors
  const data = useSelector((state: any) => state.vehicletype.vehicleType);
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const DealerRecord = useSelector((state: any) => state?.subscriber?.DelearCode);

  useEffect(() => {
    setVehicleType(data);
    setOwner(data2);
  }, [data, data2]);

  useEffect(() => {
    if (loginUser?.permissions?.Device?.Add === false && loginUser.role !== 'SuperAdmin') {
      navigate('/');
    }
  }, [loginUser, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload:any={}
        const payload2:any={status:"Active"}

        await dispatch(GetDealearRecord(payload));
        await dispatch(fetchVehicleType(payload2));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSubmit = async (val: any) => {
    const displayParameters = val.displayParameters.reduce((obj: any, key: any) => {
      obj[key] = true;
      return obj;
    }, {});
    setloder(true)
    const payload: any = {
      ...val,
      displayParameters,
      status: val.deviceStatus,
      fule: val.fuelStatus !== 'of',
      ownerID: data2?._id,
    };

    let responce=await dispatch(addDevice(payload));
    if(responce.payload){
    setloder(false)
      navigate("/account-management/manage-subscriber")
    }
    setloder(false)
  };

  return (
    <div className="w-full">
      <DeviceHeader sibglesubscriber={data2} />
      <div className="my-5">
        <GlobalForm
          fields={vehicleFields(loginUser, DealerRecord)}
          handleSubmit={handleSubmit}
          buttontext="Add Device"
          disabled={loder}
        />
      </div>
    </div>
  );
};

export default AddDevices;
