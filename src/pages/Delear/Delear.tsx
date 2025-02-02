import CommonHeader from "../../common/CommonHeader"
import DelearTable from "./Component/Delear/DelearTable"
function Delear() {
    const propsData={
        title:"List of All Dealer",
        button:"Add New +",
        redirect:"AddDelear",
    }
  return (
    <>
    <CommonHeader  propsData={propsData} />
    <DelearTable/>
    </>
  )
}

export default Delear
 