import { useSelector, useDispatch } from 'react-redux'
import GlobalForm from '../../../../GlobalForm/GlobalForm'
import { ViewDeviceDeailKeys } from '../../../../Utility/FolmKeys/DeviceDetail/ViewDeviceDeailKeys';
import DeviceDetailTable from './DeviceDetailTable';
import { useEffect, useState } from 'react';
import { getDeviceDetail, updateDeviceDetail } from '../../../../api/DeviceDetails';
import { AppDispatch } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';

function ViewDeviceDetail() {
  const deviceDetail = useSelector((state: any) => state?.deviceDetail?.singleDeviceDetail);
  const devicetypeDetails = useSelector((state: any) => state?.DeviceTye?.deviceType);
  const dispatch = useDispatch<AppDispatch>();
  const [loder,setloder]=useState(false)
  const [save,setSave]=useState("Save")
  const navigate=useNavigate()
  const handleSubmit = async(formData: any) => {
  let payload:any={
    ...formData,
    _id:deviceDetail?._id
  }
  setloder(true)
    let responce:any=await dispatch(updateDeviceDetail(payload));
    if(responce.payload){
      const payload2:any={
      }
      await dispatch(getDeviceDetail(payload2))
  setloder(false)

      navigate("/manage-Inventory")
    }
  }
  useEffect(() => {
    if (deviceDetail?.assigned=="Assigned") {
      setSave("")
      console.log("Updated device details:", deviceDetail);
    }
  }, [deviceDetail]);

  if (!deviceDetail || !devicetypeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mt-2">
        <GlobalForm
          fields={ViewDeviceDeailKeys(deviceDetail, devicetypeDetails)}
          handleSubmit={handleSubmit}
          buttontext={save} disabled={loder}        />
      </div>
      {/* <DeviceDetailTable  /> */}
    </div>
  );
}

export default ViewDeviceDetail;
