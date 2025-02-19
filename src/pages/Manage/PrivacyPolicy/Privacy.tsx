import ManagePrivacy from './Component/ManagePrivacy'
import Breadcrumb from '../../../common/Breadcrumb'
import CommonHeader from '../../../common/CommonHeader'
function Privacy() {
  const propsData={
    title:"Privacy Policy Content Management " 
   }
  return (
    
    <div >
        <div className=''><Breadcrumb/></div>
      <div className="my-5">
      <CommonHeader  propsData={propsData} />

      </div>
      <div className='bg-[#fff]'>
      <ManagePrivacy/>
      </div>
     
    </div>
  )
}

export default Privacy
