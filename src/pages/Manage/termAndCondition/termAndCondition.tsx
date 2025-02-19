import ManageTermAndCondition from './Component/ManageTermAndCondition';
import Breadcrumb from '../../../common/Breadcrumb';
import CommonHeader from '../../../common/CommonHeader';
function TermAndCondition() {
  const propsData={
    title:"Term&Condition Content Management"
  }
  return (
    <div>
      <div className="">
        <Breadcrumb />
      </div>
      <div className="my-5">
      <CommonHeader  propsData={propsData} />

      </div>
      <div className="bg-[#fff]">
        <ManageTermAndCondition />
      </div>
    </div>
  );
}

export default TermAndCondition;
