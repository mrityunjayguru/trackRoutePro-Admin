import { useState, useEffect } from 'react';
import { fetchVehicleType } from '../../../../api/VehicleType';
import { useDispatch, useSelector } from 'react-redux';
import { manageSingleDevices, updateDevices } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { ViewDeviceKeys } from '../../../../Utility/FolmKeys/Devices/ViewDeviceKey';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { getDeviceType } from '../../../../api/DeviceType';
import ListOfDileaeDevices from './ListOfDileaeDevices';
import DeviceHeader from '../../../ManageUsers/Component/Devices/DeviceHeader';
import ExpiryComponent from '../../../../common/ExpiryComponent';

const ViewDelearDevices = () => {
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

  const DealerRecord = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye.deviceType,
  );

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

  const handleSubmit = async () => {
    navigate('/EditDelearDevice');
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
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options); // Formats to "11 Jan 2024"
  };

  const formattedVehicleTypes = VehiclwType?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName, // Use the name of the vehicle type as label
    value: vehicle._id, // Convert to lowercase and replace spaces with dashes
    icon: vehicle.icons, // Assuming the icon filename is stored in `icons`
  }));
  const getDeviceTypes = async () => {
    try {
      const payload: any = {};
      const response: any = await dispatch(getDeviceType(payload));
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
      <div className="w-full">
        <DeviceHeader sibglesubscriber={PropsRecord} />

        <div className="my-5   p-5">
          <GlobalForm
            fields={ViewDeviceKeys(
              singleDevices,
              formattedVehicleTypes,
              devicetypeDetails,
              DealerRecord
            )}
            handleSubmit={handleSubmit}
            buttontext="Edit Device" disabled={false}          />

          <div>
            <ExpiryComponent singleDevices={singleDevices} />
          </div>
          <div className="mt-20">
            {/* <OtherDetails /> */}
            <ListOfDileaeDevices />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDelearDevices;
