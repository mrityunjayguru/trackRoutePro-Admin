import React, { useEffect, useState } from 'react'
import { adddesignation, getdesignation } from "../../../../api/ecomm/designation";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';

function DesigationForm() {
      const [designation, setDesignation] = useState("");
  const dispatch=useDispatch<AppDispatch>()
    
     const handleAdd = async() => {
        if (!designation.trim()) return;
        const payload:any={
          designation:designation
        }
        await dispatch(adddesignation(payload))
    
        setDesignation("");
      };
    const getRecords=async()=>{
      const payload:any={
      }
    await dispatch(getdesignation(payload))
    }
     useEffect(()=>{
    getRecords()
     },[])
  return (
    <div>
        <h2 className="text-lg font-semibold text-[#585859] ">
          Add Designation
        </h2>
        <label className="block mb-1 text-sm font-medium text-[#585859]">
          Designation<span className="text-yellow-500">*</span>
        </label>
        <input
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="Enter Designation"
          className="w-full border rounded px-3 py-2 mb-4 placeholder:text-[#C8CEDD]"
        />
        <button
          onClick={handleAdd}
          className="bg-[#1E1E1E] text-[#D9E821] px-6 py-2 rounded"
        >
          Add Designation
        </button>
      </div>
  )
}

export default DesigationForm
