import { useState, useEffect } from 'react';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { manageSingleDevices, updateDevices } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { getDeviceType } from '../../../../api/DeviceType';
import ListOfDileaeDevices from './ListOfDileaeDevices';
// import DeviceHeader from './DeviceHeader';
// import ListOfDevices from './ListOfDevices';
interface VehicleType {
  _id: string;
  icons: string;
  vehicleTypeName: string;
}

const ViewDelearDevice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [vehicletypes, setVehicleType] = useState<VehicleType[]>([]);
  const VehiclwType = useSelector((state: any) => state.vehicletype.vehicleType);
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);
  const singleDevices = useSelector((state: any) => state.subscriber.singleDevice);
  const allDevices = useSelector((state: any) => state.subscriber.userDevices);

  const [owner, setOwner] = useState<{ uniqueID?: string; _id?: string }>({});
  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye.deviceType,
  );
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const getVehicleType = async () => {
    const payload: any = {};
    try {
      await dispatch(fetchVehicleType(payload));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVehicleType();
  }, [dispatch]);
  const reniewsubscribes = () => {
    localStorage.setItem('ownerid', data2._id);

    navigate('/manage/deviceList');
  };
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  // Handler for the change event
  const handleDeviceChange = (event: any) => {
    setSelectedDeviceId(event.target.value); // Set the selected deviceId to state

    allDevices.find((val: any) => {
      if (val._id == event.target.value) {
        dispatch(manageSingleDevices(val));
      }
    });
  };
  const getDates = (mydate: any): string => {
    const date = new Date(mydate);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // Formats to "11 Jan 2024"
  }

  const formattedVehicleTypes = VehiclwType?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName,  // Use the name of the vehicle type as label
    value: vehicle._id,  // Convert to lowercase and replace spaces with dashes
    icon: vehicle.icons,  // Assuming the icon filename is stored in `icons`
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
  const PropsRecord={
    ...data2,
    ...singleDevices
    }
  return (
    <>
      <div className="w-full">
      {/* <DeviceHeader sibglesubscriber={PropsRecord}  /> */}
        <div className="my-5 p-2 ">
        
      
          <div className="mt-20">
            {/* <OtherDetails /> */}
            <ListOfDileaeDevices/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDelearDevice;
