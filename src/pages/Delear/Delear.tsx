import { useDispatch, useSelector } from "react-redux";
import { downloadDelear } from "../../api/DownloadDetail";
import CommonHeader from "../../common/CommonHeader"
import DelearTable from "./Component/Delear/DelearTable"
import { AppDispatch } from "../../store/store";
import { redirect } from "react-router-dom";
function Delear() {
  const dispatch=useDispatch<AppDispatch>()
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
    const propsData={
        title:"List of All Dealer",
        redirect:"AddDelear"
    }
    if(loginUser?.permissions?.Manage_Dealer?.Add || loginUser.role=="SuperAdmin"){
      Object.assign(propsData,{button:"Add New +"})
    }
    if(loginUser?.role=="SuperAdmin"){
      Object.assign(propsData,{button3:"Download Delear's"})
    }
      const handledownload = async () => {
        try {
          const payload: any = {};
          let response = await dispatch(downloadDelear(payload));
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
 <div className="p-5">
     <CommonHeader  propsData={propsData} handledownload={handledownload}/>
    {loginUser?.permissions?.Manage_Dealer?.View || loginUser.role=="SuperAdmin"?(<DelearTable/>):(null)}
 </div>

    </>
  )
}

export default Delear
 