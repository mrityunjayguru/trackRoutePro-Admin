import ManageAbout from './component/ManageAbout'
import Breadcrumb from '../../../common/Breadcrumb'
import CommonHeader from '../../../common/CommonHeader'
function About() {
  const propsData={
   title:"About Us Content Management" 
  }
  return (
    <div >
        <div className=''><Breadcrumb/></div>
      <div className="my-5">
      <CommonHeader  propsData={propsData} />

      </div>
      <div className='bg-[#fff]'>
      <ManageAbout/>
      </div>
     
    </div>
  )
}

export default About
