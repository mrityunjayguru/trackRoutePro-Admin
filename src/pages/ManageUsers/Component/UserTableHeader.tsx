import { useDispatch, useSelector } from 'react-redux';

import CommonHeader from '../../../common/CommonHeader';
import { AppDispatch } from '../../../store/store';
import { dowonloadUser } from '../../../api/DownloadDetail';
function UserTableHeader() {
  const dispatch=useDispatch<AppDispatch>()
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const propsData = {
    title: 'List of All Subscribers',
    button3: "Download User's",
  };
  if (
    loginUser?.permissions?.Subscribers?.Add == true ||
    loginUser.role == 'SuperAdmin'
  ) {
    Object.assign(propsData, {
      redirect: 'account-management/manage-subscriber/add',
    });
    Object.assign(propsData, { button: 'Add New +' });
  }
  const handledownload = async () => {
    try {
      const payload: any = {};
      let response = await dispatch(dowonloadUser(payload));
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
    <>
      <CommonHeader propsData={propsData} handledownload={handledownload} />
    </>
  );
}

export default UserTableHeader;


