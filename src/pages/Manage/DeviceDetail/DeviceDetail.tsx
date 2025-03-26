import DeviceDetailTable from './Component/DeviceDetailTable'
import CommonHeader from '../../../common/CommonHeader'
import { getDeviceType } from '../../../api/DeviceType';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { downloadInventry, dowonloadUser } from '../../../api/DownloadDetail';
function DeviceDetail() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  const dispatch=useDispatch<AppDispatch>()
    const propsData={
        title:"GPS Device Inventory",
        redirect:"manage/AddDeviceDetail",
    }
if(loginUser?.permissions?.Manage_Inventory?.Add || loginUser.role=="SuperAdmin"){
  Object.assign(propsData,{button:"Add New +"})
}
if(loginUser.role=="SuperAdmin"){
  Object.assign(propsData,{button3:"Download Inventory"})
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
        const handledownload = async () => {
          try {
            const payload: any = {};
            let response = await dispatch(downloadInventry(payload));
            // Ensure we have a valid file URL
            if (response.payload?.data?.data) {
              const fileUrl = `${import.meta.env.VITE_APP_Image_Url}${response.payload.data.data}`; // Construct full URL
              const a = document.createElement("a");
              a.href = fileUrl;
              a.download = response.payload.data.data.split("/").pop(); // Extract file name from URL
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            } else {
              console.error("Download failed: No file URL received");
            }
          } catch (error) {
            console.error("Error while downloading:", error);
          }
        };
  return (
    <div>
      <CommonHeader propsData={propsData} handledownload={handledownload} />
      {loginUser?.permissions?.Manage_Inventory?.View || loginUser.role=="SuperAdmin"?(
      <DeviceDetailTable/>
      ):(null)}

    </div>
  )
}

export default DeviceDetail
