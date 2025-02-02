import CommonHeader from '../../../../common/CommonHeader';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { DevicesType } from '../../../../Utility/FolmKeys/DeviceType/DevicesType';
import { addDeviceType } from '../../../../api/DeviceType';
import { AppDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function AddDeviceType() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loder,setloder]=useState(false)
  const handleSubmit = async(payload: any) => {
    try {
      setloder(true)
      await dispatch(addDeviceType(payload));
      setloder(false)
      navigate('/device-management/gps/add-device');
    } catch (err) {
      setloder(false)
      console.log(err);
    }
  };
  const propsData = {
    title: 'Add Device Type',
    button: '',
    redirect: '',
  };
  return (
    <>
      <CommonHeader propsData={propsData} />

      <div className="my-5">
        <GlobalForm
          fields={DevicesType}
          handleSubmit={handleSubmit}
          buttontext="Add Type"
          disabled={loder}
        />
      </div>
    </>
  );
}

export default AddDeviceType;
