import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react"; // or use any edit icon from react-icons
import { UseSelector,useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { adddesignation, getdesignation } from "../../../../api/ecomm/designation";
const RelayForm = () => {
  const records=useSelector((state:any)=>state.designation.designation)
  const dispatch=useDispatch<AppDispatch>()
  const [designation, setDesignation] = useState("");
  const [designations, setDesignations] = useState([
    { name: "Manager", status: false },
    { name: "Sales Lead", status: true },
    { name: "Sales Assistant", status: true },
  ]);

  const handleAdd = async() => {
    if (!designation.trim()) return;
    setDesignations([...designations, { name: designation, status: true }]);
    const payload:any={
      designation:designation
    }
    await dispatch(adddesignation(payload))

    setDesignation("");
  };

  const toggleStatus = (index: number) => {
    const updated = [...designations];
    updated[index].status = !updated[index].status;
    setDesignations(updated);
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
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 p-4">
      {/* Left Side: Add Designation */}
      <div>
        <h2 className="text-lg font-semibold text-[#585859] mb-6">
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

      {/* Right Side: Designation List */}
      <div>
        <h2 className="text-lg font-semibold text-[#585859] mb-4">
          Designation List
        </h2>
        <table className="w-full border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-[#585859]">
              <th className="pb-2">Designation</th>
              <th className="pb-2">Edit</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item:any, index:any) => (
              <tr
                key={index}
                className={item.status ? "bg-[#F5F7FA]" : ""}
              >
                <td className="py-2">{item.designation}</td>
                <td>
                  <button className="text-purple-600 hover:opacity-75">
                    <Pencil size={16} />
                  </button>
                </td>
                <td>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.status}
                      onChange={() => toggleStatus(index)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white border rounded-full shadow-md transition-transform peer-checked:translate-x-5 peer-checked:bg-[#D9E821]"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RelayForm;
