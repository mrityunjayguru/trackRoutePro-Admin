import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../common/Breadcrumb";
import CommonHeader from "../../../../common/CommonHeader";

function FaQHeaders() {
    const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
    const navigate=useNavigate()
    const AddList = () => {
        // if (loginUser.permissions.FAQ?.Add == true) {
        navigate('/manage/Add-List');
        // }
      };
      const propsData={
        title:"FAQs List",
        redirect:"manage/Add-List",
        button:"Add New +"

      }
  return (
  <>
    <div className=''><Breadcrumb/></div>
    <CommonHeader  propsData={propsData} />

  </>
  )
}

export default FaQHeaders
