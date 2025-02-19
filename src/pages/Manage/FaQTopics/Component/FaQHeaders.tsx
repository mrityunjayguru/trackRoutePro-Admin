import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../common/Breadcrumb";
import CommonHeader from "../../../../common/CommonHeader";

function FaQHeaders() {
    const navigate=useNavigate()
    const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
   
      const propsData={
        title:"FAQ Topics List"
    }
    if(loginUser.role=="SuperAdmin"){
      Object.assign(propsData,{redirect:"manage/add-Topic-List"})
      Object.assign(propsData,{button:"Add New +"})
    }
  return (
    <>
        <div className=''><Breadcrumb/></div>
        <CommonHeader  propsData={propsData} />

    </>
 
  )
}

export default FaQHeaders
