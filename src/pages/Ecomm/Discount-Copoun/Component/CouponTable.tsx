import React, { useEffect, useState } from 'react';
import { getcoupon, setUpdatecoupon, updatecoupon } from '../../../../api/ecomm/coupon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { formatDateToDDMMMYYYYwithDate, formatDateToDDMMMYYYYwithTime } from '../../../../common/ManageDate';
import Dropdown from '../../Common/Dropdown';
import Pagination from '../../../../common/Loader/Pagination';

function CouponTable() {
  const couponRecord = useSelector((state: any) => state?.coupon?.coupon?.Record);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedItem, setSelectedItem] = useState<any>("Offer");
  const itemsPerPage = 10; // Adjust this value as needed
  const [currentPage, setCurrentPage] = useState(1);
  const total: any = useSelector(
    (state: any) => state?.coupon?.coupon?.totalcount,
  );
  const getData = async () => {
    try {
      const payload:any={
      offset: (currentPage - 1) * itemsPerPage,
      }
      if(selectedItem)
      Object.assign(payload,{status:selectedItem?.value})
      await dispatch(getcoupon(payload));

    } catch (err) {
      console.error('Error fetching coupons:', err);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedItem,currentPage]);

  const handleUpdate = async (val: any) => {
    dispatch(setUpdatecoupon(val));
  };

  const handleToggle = async (coupon: any) => {
    const updatedCoupon = {
      ...coupon,
      isDeleted: !coupon.isDeleted,
    };

    try {
      await dispatch(updatecoupon(updatedCoupon));
      await getData(); // Refresh the table
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };
  const fruitOptions = [
    { id: 'Team', name: 'Team ' },
    { id: 'Offer', name: 'Offer ' },
  
  ];

  // Callback function to receive data from the Dropdown child component
  const handleDropdownSelect = (item: any) => {
    setSelectedItem(item);
      //  getData();

  };
  return (
    <div>
      <h2 className="text-gray-700 font-semibold mb-4">Discount Coupon List</h2>
       <Dropdown
          options={fruitOptions}
          valueKey="id"     // The key in each option object that represents its value
          labelKey="name"   // The key in each option object that represents its label
          onSelect={handleDropdownSelect} // The callback function to get selected data
        />
      <table className="w-full text-sm text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Code</th>
            <th className="p-2">Discount</th>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
            <th className="p-2">Edit</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {couponRecord?.map((c: any, i: number) => (
            <tr key={i} className="border-b">
              <td className="p-2" onClick={() => handleUpdate(c)}>{c.discountCode}</td>
              <td className="p-2">{c.discountPercent}%</td>
              <td className="p-2">{c?.discountStart ? formatDateToDDMMMYYYYwithDate(c?.discountStart) : "NA"}</td>
              <td className="p-2">{c?.discountEnd ? formatDateToDDMMMYYYYwithDate(c?.discountEnd) : "NA"}</td>
              <td className="p-2 text-center">
                <button className="text-indigo-500 hover:text-indigo-700" onClick={() => handleUpdate(c)}>
                  ✏️
                </button>
              </td>
              <td className="p-2 text-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={c.isDeleted}
                    onChange={() => handleToggle(c)}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-400 relative">
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        c.isDeleted ? 'translate-x-5' : ''
                      }`}
                    ></div>
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         <Pagination
          totalCount={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
    </div>
  );
}

export default CouponTable;
