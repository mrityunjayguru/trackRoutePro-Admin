import { FaEye } from 'react-icons/fa';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Modal from '../../../components/ModalSettings';
import { updateSuport, getAllSuport } from '../../../api/suport';
import { AppDispatch } from '../../../store/store';
import {
  formatDateToDDMMMYYYY,
  formatDateToDDMMMYYYYwithDate,
} from '../../../common/ManageDate';
import RejectionModal from './RejectionModal';
import OtherDetail from './OtherDetail';

interface HandleSnNo {
  currentPage: number;
  itemsPerPage: number;
}

interface SuportTableProps {
  handleSnNo: HandleSnNo;
}

const Suporttable = ({ handleSnNo }: SuportTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Suportdetails, setSuportdetails] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState<string>(''); // Added state for rejection reason
  const suportdata = useSelector(
    (state: any) => state.suport?.Allsuport?.records,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  useEffect(() => {}, [handleSnNo]);

  const viewDetails = (subscriber: any) => {
    const suportData = {
      title: subscriber.suport,
      description: subscriber.description,
      createdAt: subscriber.createdAt,
      emailAddress: subscriber?.userdata?.emailAddress,
      name: subscriber?.userdata?.Name,
    };
    setSuportdetails(suportData);
    setIsModalOpen(true);
  };

  const [disabled, setdisabled] = useState(false);
const [id,setid]=useState(null)
  const handleStatusChange = async (selectedOption: any, subscriberId: any) => {
    setid(subscriberId)
    if (selectedOption.value === 'Rejected') {
      setOpen(true);
    } else {
      const payload:any = {
        status: selectedOption.value,
        _id: subscriberId,
      };
      const payload2:any={}
      try {
        await dispatch(updateSuport(payload));
        await dispatch(getAllSuport(payload2));
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (
      loginUser.permissions.Support?.Update !== true &&
      loginUser.role !== 'SuperAdmin'
    ) {
      setdisabled(true);
    }
  }, [loginUser]);

  const handleclose = () => {
    setOpen(false);
  };

  const handlesubmit = async (reason: string, subscriberId: any) => {
    // Handle rejection logic here
    const payload:any = {
      status: 'Rejected',
      message: reason,
      _id: id,
    };
const payload2:any={}
    try {
      await dispatch(updateSuport(payload)); // Update status to 'Rejected' along with reason
      await dispatch(getAllSuport(payload2));
      setRejectionReason(''); // Reset rejection reason
      setOpen(false); // Close the rejection modal
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
    <OtherDetail isOpen={isModalOpen}
        onClose={handleCloseModal}
        Suportdetails={Suportdetails}   />
      <RejectionModal
        isOpen={open}
        onClose={handleclose}
        onSubmit={(reason: string) => handlesubmit(reason, Suportdetails?._id)} // Passing the rejection reason and subscriberId
      />
      <div className="rounded-sm xl:pb-1 overflow-auto min-h-[60vh]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" text-gray-700 font-semibold text-base">
            <tr>
              <th className="p-1 text-[#949495] text-sm cursor-pointer">No#</th>
              <th className="p-1 text-[#949495] text-sm cursor-pointer">Date</th>
              <th className="p-1 text-[#949495] text-sm cursor-pointer">Name</th>
              <th className="p-1 text-[#949495] text-sm cursor-pointer">Email</th>
              <th className="p-1 text-[#949495] text-sm cursor-pointer">Subject</th>
              <th className="p-1 text-[#949495] text-sm cursor-pointer">Detail</th>
              <th className="p-1 text-[#949495] text-sm cursor-pointer">Status</th>
              {/* <th className="p-1 text-[#949495] text-sm cursor-pointer">Manage</th> */}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {suportdata && suportdata?.length > 0 ? (
              suportdata.map((subscriber: any, i: number) => (
                <tr
                  key={subscriber.id}
                  className={` text-black border-b border-[#D9E821] text-center text-[15px] font-medium ${
                    subscriber.status === 'Resolved' ? 'text-[#949495]' : 'text-black'
                  }`}
                >
                  <td className="p-1 border-b border-[#D9E821]">
                    {handleSnNo?.currentPage > 1
                      ? (handleSnNo?.currentPage - 1) * handleSnNo?.itemsPerPage + i + 1
                      : i + 1}
                  </td>
                  <td className="p-1 border-b border-[#D9E821]">
                    {formatDateToDDMMMYYYY(subscriber.updatedAt)}
                  </td>
                  <td className="p-1 border-b border-[#D9E821]">{subscriber?.userdata?.Name}</td>
                  <td className="p-1 border-b border-[#D9E821]">
                    {subscriber.userdata?.emailAddress?.length > 15
                      ? `${subscriber.userdata?.emailAddress.slice(0, 15)}...`
                      : subscriber.userdata?.emailAddress}
                  </td>
                  <td className="p-1 border-b border-[#D9E821]">
                    {subscriber.suport?.length > 15
                      ? `${subscriber.suport.slice(0, 15)}...`
                      : subscriber.suport}
                  </td>
                  <td className="p-1 border-b border-[#D9E821]">
                    {subscriber.description?.length > 15
                      ? `${subscriber.description.slice(0, 15)}...`
                      : subscriber.description}
                  </td>
                  <td className="p-1 border-b border-[#D9E821]">
                    <Select
                      key={subscriber.status}
                      isSearchable={false}
                      options={statusOptions}
                      defaultValue={statusOptions.find((option) => option.value === subscriber.status)}
                      onChange={(selectedOption) =>
                        handleStatusChange(selectedOption, subscriber._id)
                      }
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          border: '1px solid #D9E821', // Custom border color
                          boxShadow: state.isFocused ? '0 0 0 1px #D9E821' : 'none', // Border color on focus
                          '&:hover': {
                            borderColor: '#D9E821', // Hover state border color
                          },
                        }),
                      }}
                    />
                  </td>
                  <td className="p-1 border-b border-[#D9E821]">
                    <FaEye
                      className="text-[#02B754]"
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      onClick={() => viewDetails(subscriber)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-1 py-0.5 text-center">
                  No support data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Suporttable;
