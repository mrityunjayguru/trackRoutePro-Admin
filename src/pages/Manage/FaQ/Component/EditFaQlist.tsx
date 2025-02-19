import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { editFaQList } from '../../../../api/FaQList';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../common/Breadcrumb';
import CommonHeader from '../../../../common/CommonHeader';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { EditFaQKeys } from '../../../../Utility/FolmKeys/FAQ/EditFaQKeys';



const EditFaQlist: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Select the single FAQ to edit from Redux store
  const singlfawlist = useSelector((state: any) => state.FaqList.singleFaqList);
  const topics:any = useSelector((state: any) => state.FaQPriority.AllFFaQPriorityt); // Assuming topics come from a Redux state


  // Handle form submission
  const handleSubmit = async (payload: any) => {
    setLoader(true); // Set loading to true before submitting
    try {
      if (singlfawlist) {
        // If record exists, update it by dispatching edit action
        await dispatch(editFaQList({ ...payload, _id: singlfawlist?._id }));
        navigate("/device-management/content/faqs-content"); // Redirect after submission
      }
    } catch (error) {
      console.error("Error updating FAQ:", error); // Handle any errors during submission
    } finally {
      setLoader(false); // Set loading to false after submission
    }
  };

  const propsData = {
    title: 'Edit FAQ', // Change title to Edit FAQ
  };

  return (
    <>
      <div className="w-full">
        <div>
          <Breadcrumb />
        </div>

        <div className="my-5">
          <CommonHeader propsData={propsData} />
        </div>

        {/* GlobalForm component with fields passed dynamically */}
        <GlobalForm
          fields={EditFaQKeys(singlfawlist,topics)} // Keys for form fields
          handleSubmit={handleSubmit} // Handle submit function
          buttontext="Submit" // Submit button text
          disabled={loader} // Disable button when loading
        />
      </div>
    </>
  );
};

export default EditFaQlist;
