import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { getNotification } from '../../../api/Noification';
import Modal from './Modal'; // Import your Modal component
import Pagination from '../../../common/Loader/Pagination';
import CommonHeader from '../../../common/CommonHeader';
import CommonTable from '../../../common/Table/CommonTable';
import { NotificationTableKey } from '../../../Utility/CommonTableKey/NotificationTableKey';
const Notificationtable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const records =
    useSelector(
      (state: any) => state.notification.AllNotification?.records || [],
    ) || [];
  const total: any = useSelector(
    (state: any) => state.notification.AllNotification?.totalcount,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed
  useEffect(() => {
    const payload: any = {};
    dispatch(getNotification(payload));
  }, [dispatch]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };
  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    const payload: any = {
      offset: offset,
    };
    dispatch(getNotification(payload));
  }, [currentPage]);
  const propsData = {
    title: ' Announcement History',
  };
  const handleRowClick = (val: any) => {
    setSelectedNotification(val);
    setIsModalOpen(true);
  };
  return (
    <div className="rounded-sm ">
      <CommonHeader propsData={propsData} />
      <CommonTable
        columns={NotificationTableKey}
        data={records}
        onRowClick={handleRowClick} // Optional: Add row click behavior
        currentPage={currentPage}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        notification={selectedNotification}
      />

      <Pagination
        totalCount={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Notificationtable;
