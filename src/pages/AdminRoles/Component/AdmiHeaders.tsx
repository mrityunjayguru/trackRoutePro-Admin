import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import CommonHeader from "../../../common/CommonHeader";
import { downloadAdmin, dowonloadUser } from "../../../api/DownloadDetail";
import { AppDispatch } from "../../../store/store";

function AdmiHeaders() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const dispatch=useDispatch<AppDispatch>()

    const navigate=useNavigate()
  
    const handleclick=()=>{
        if(loginUser.role=="SuperAdmin"){
          navigate('/Admin-Roles/Add-Admin-Roles')
    }
    }
    const propsData={
        title:"List of All Admin",
        button3: "Download Admin's",

    }
    if(loginUser?.permissions?.Admin?.Add==true || loginUser.role=="SuperAdmin"){
      Object.assign(propsData,{redirect:"admin-roles/add-admin-roles"})
      Object.assign(propsData,{button:"Add New +"})

    }
      const handledownload = async () => {
        try {
          const payload: any = {};
          let response = await dispatch(downloadAdmin(payload));
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
<CommonHeader  propsData={propsData} handledownload={handledownload} />

</>
  )
}

export default AdmiHeaders
