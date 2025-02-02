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
  console.log(singleDevices,"singleDevicessingleDevices")
  return (
    <>
      <div className="w-full">
        <DeviceHeader sibglesubscriber={PropsRecord} />
        <div className="my-5 p-2 ">
          <GlobalForm
            fields={ViewDeviceKeys(
              singleDevices,
              formattedVehicleTypes,
              devicetypeDetails,
              DealerRecord,
            )}
            handleSubmit={handleSubmit}
            buttontext="Edit Device"
          />

          <div className="py-2 px-5 flex gap-24">
            <div>
              <p className="textred font-bold text-[12px]">
                Subscription Expire
              </p>
              <h1 className="text-[#000] font-bold text-[14px]">
                {singleDevices?.subscriptionexp
                  ? getDates(singleDevices.subscriptionexp)
                  : '-'}
              </h1>{' '}
            </div>
            <div
              onClick={reniewsubscribes}
              className="bg-[#000] text-[12px] font-bold cursor-pointer texty flex justify-center items-center py-1 px-5 rounded-2xl"
            >
              Renew / Extend Subscription
            </div>
          </div>
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
