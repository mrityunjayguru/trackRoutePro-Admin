import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import CommonHeader from "../../../common/CommonHeader";

function AdmiHeaders() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

    const navigate=useNavigate()
  
    const handleclick=()=>{
        if(loginUser.role=="SuperAdmin"){
          navigate('/Admin-Roles/Add-Admin-Roles')
    }
    }
    const propsData={
        title:"List of All Admin"
    }
    if(loginUser?.permissions?.Admin?.Add==true || loginUser.role=="SuperAdmin"){
      Object.assign(propsData,{redirect:"admin-roles/add-admin-roles"})
      Object.assign(propsData,{button:"Add New +"})

    }
  return (
<>
<CommonHeader  propsData={propsData} />

</>
  )
}

export default AdmiHeaders
