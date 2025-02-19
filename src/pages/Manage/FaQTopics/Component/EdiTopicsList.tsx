import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { editFaQPriorityList } from '../../../../api/FaQPriorityList';
import Breadcrumb from '../../../../common/Breadcrumb';
import CommonHeader from '../../../../common/CommonHeader';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { EditTopicKeys } from '../../../../Utility/FolmKeys/Topic/EditTopicKeys';

const EdiTopicsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const singlfawlist = useSelector(
    (state: any) => state.FaQPriority.singleFFaQPriorityt,
  );
  const [loder, setLoder] = useState(false);

  const Navigate = useNavigate();
  const handleSubmit = async (val: any) => {
    setLoder(true)
    const payload: any = {
      title:val.title,
      priority:val.priority,
      status:val.status,
      _id: singlfawlist._id,
    };
    await dispatch(editFaQPriorityList({ ...payload, _id: singlfawlist._id }));
    setLoder(false)
    Navigate('/device-management/content/faqs');
    // Reset the form
  };

  const propsData = {
    title: 'Edit List',
  };
  return (
    <>
      <div className="">
        <Breadcrumb />
      </div>

      <div className="w-full">
        <CommonHeader propsData={propsData} />

        <div className="my-5">
          <GlobalForm
            fields={EditTopicKeys(singlfawlist)}
            handleSubmit={handleSubmit}
            buttontext="Submit"
            disabled={loder}
          />
        </div>
      </div>
    </>
  );
};

export default EdiTopicsList;
