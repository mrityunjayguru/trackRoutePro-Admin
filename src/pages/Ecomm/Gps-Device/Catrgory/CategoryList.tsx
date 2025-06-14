// components/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getcategoryResult, handleupdateCategory, updateCategory, updatesubCategory } from '../../../../api/ecomm/gpsDevices';
import { AppDispatch } from '../../../../store/store';

const CategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categoryresult = useSelector((state: any) => state.gpsDevices?.categoryresult);
  const [statusMap, setStatusMap] = useState<{ [key: string]: boolean }>({});

  const getCategoryResults = async () => {
    try {
      const payload: any = {};
      await dispatch(getcategoryResult(payload));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategoryResults();
  }, []);

  useEffect(() => {
    if (categoryresult) {
      const initialStatus = Object.fromEntries(
        categoryresult?.map((cat: any) => [cat._id, !cat.isDeleated])
      );
      setStatusMap(initialStatus);
    }
  }, [categoryresult]);

  const handleToggle = async(val:any) => {
  const payload:any = {
      _id:val._id,
      isDeleted: !val.isDeleted,
    };
  await  dispatch(handleupdateCategory(payload))
   await getCategoryResults();

    // Optional: Trigger API call here to update status
  };

  const handleUpdatecategory=async(val:any)=>{
  await  dispatch(updateCategory(val))
  }
  const handleUpdateSubcategory=async(cat:any,sub:any)=>{
const payload:any={
  category:cat,
  subcategory:sub
}
  await  dispatch(updatesubCategory(payload))
  }

  return (
    <div className="p-4 w-full">
      <h2 className="font-semibold mb-4">List of Category</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b text-sm text-gray-600">
            <th className="py-2 px-3">Category</th>
            <th className="py-2 px-3">Sub Categories</th>
            <th className="py-2 px-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {categoryresult?.map((cat: any, index: number) => (
            <tr
              key={cat._id}
              className={`text-sm ${index % 2 === 0 ? '' : 'bg-gray-50'} hover:bg-gray-100`}
            >
              <td className="py-3 px-3 whitespace-nowrap flex items-center gap-2">
                {cat.name}
                <FaEdit onClick={()=>handleUpdatecategory(cat)} className="text-purple-500 cursor-pointer" />
              </td>
              <td className="py-3 px-3">
                <div className="flex flex-wrap gap-4">
                  {cat?.subCategories?.map((sub: any) => (
                    <div key={sub._id} className="flex items-center gap-1 text-yellow-500">
                      {sub.subcategory}
                      <FaEdit className="cursor-pointer" onClick={()=>handleUpdateSubcategory(cat,sub)} />
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <label className="inline-flex items-center cursor-pointer">
                  <input onChange={()=>handleToggle(cat)}
                    type="checkbox"
                    checked={cat.isDeleted}
                    readOnly
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full peer relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
