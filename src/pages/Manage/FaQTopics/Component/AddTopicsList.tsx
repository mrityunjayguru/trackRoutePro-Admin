import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addFaQPriorityList } from '../../../../api/FaQPriorityList';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../common/Breadcrumb';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { addTopicKeys } from '../../../../Utility/FolmKeys/Topic/AddTopicKeys';
import CommonHeader from '../../../../common/CommonHeader';

const AddTopicsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (val: any) => {
    setloder(true)
    await dispatch(addFaQPriorityList(val));
    navigate('/device-management/content/faqs');
    setloder(false)
  };

  const propsData = {
    title: 'Add Topic',
  };
  const [loder, setloder] = useState(false);
  return (
    <div className="w-full">
      <div className="">
        <Breadcrumb />
      </div>
      <CommonHeader propsData={propsData} />
<div className='my-5'>
  
<GlobalForm
        fields={addTopicKeys}
        handleSubmit={handleSubmit}
        buttontext="Submit"
        disabled={loder}
      />
</div>
    </div>
  );
};

export default AddTopicsList;
