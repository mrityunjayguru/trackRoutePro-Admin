import DeviceDetailTable from './Component/DeviceDetailTable'
import CommonHeader from '../../../common/CommonHeader'
import { getDeviceType } from '../../../api/DeviceType';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
function DeviceDetail() {
  const dispatch=useDispatch<AppDispatch>()
    const propsData={
        title:"GPS Device Inventory",
        button:"Add New +",
        redirect:"manage/AddDeviceDetail",
    }
      const getDeviceTypes = async () => {
        try {
          const payload: any = {
            status:"Active"
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
    <div>
      <CommonHeader propsData={propsData}/>
      <DeviceDetailTable/>

    </div>
  )
}

export default DeviceDetail
