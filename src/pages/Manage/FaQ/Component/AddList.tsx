import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addFaQList } from '../../../../api/FaQList';
import { Navigate, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../common/Breadcrumb';
import CommonHeader from '../../../../common/CommonHeader';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { addTopicKeys } from '../../../../Utility/FolmKeys/FAQ/AddFaQKeys';

const AddList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector(
    (state: any) => state.FaQPriority.AllFFaQPriorityt,
  );
  const navigate = useNavigate();

  // State for loading indicator
  const [loader, setLoader] = useState(false);

  // Handle form submission
  const handleSubmit = async (payload: any) => {
    try {
      // Set loading to true
      setLoader(true);
      // Dispatch the action to add FAQ list
      await dispatch(addFaQList(payload));

      // After submission, navigate to another page
      navigate('/device-management/content/faqs-content');
    } catch (error) {
      console.error('Error submitting FAQ:', error);
    } finally {
      // Set loading to false after submission
      setLoader(false);
    }
  };

  const propsData = {
    title: 'Add FAQ',
  };

  return (
    <div className="w-full">
      <div>
        <Breadcrumb />
      </div>

      <div className="my-5">
        <CommonHeader propsData={propsData} />
      </div>

      {/* GlobalForm component with fields passed dynamically */}
      <GlobalForm
        fields={addTopicKeys(records)} // Keys for form fields
        handleSubmit={handleSubmit} // Handle submit function
        buttontext="Submit" // Submit button text
        disabled={loader} // Disable button when loading
      />
    </div>
  );
};

export default AddList;
