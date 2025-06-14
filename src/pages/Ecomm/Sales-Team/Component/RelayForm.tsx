import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import {
  adddesignation,
  getdesignation,
  updatedesignation,
} from "../../../../api/ecomm/designation";

const RelayForm = () => {
  const records = useSelector((state: any) => state.designation.designation);
  const dispatch = useDispatch<AppDispatch>();

  const [designation, setDesignation] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const getRecords = async () => {
    const payload:any={}
    await dispatch(getdesignation(payload));
  };

  useEffect(() => {
    getRecords();
  }, []);

  const handleSubmit = async () => {
    if (!designation.trim()) return;

    if (editing && editId) {
      const payload:any = {
        _id: editId,
        designation: designation,
      };
      await dispatch(updatedesignation(payload));
    } else {
      const payload:any = {
        designation: designation,
      };
      await dispatch(adddesignation(payload));
    }

    setDesignation("");
    setEditing(false);
    setEditId(null);
    getRecords();
  };

  const handleEdit = (item: any) => {
    setDesignation(item.designation);
    setEditId(item.id || item._id); // adjust based on your backend ID key
    setEditing(true);
  };

  const toggleStatus = async (item: any) => {
    const payload:any = {
      id: item.id || item._id, // adjust if using _id instead of id
      designation: item.designation,
      isDeleted: !item.isDeleted,
    };
    await dispatch(updatedesignation(payload));
    getRecords();
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 p-4">
      {/* Left Side: Add or Update Designation */}
      <div>
        <h2 className="text-lg font-semibold text-[#585859] mb-6">
          {editing ? "Update Designation" : "Add Designation"}
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
          onClick={handleSubmit}
          className="bg-[#1E1E1E] text-[#D9E821] px-6 py-2 rounded"
        >
          {editing ? "Update Designation" : "Add Designation"}
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
            {records.map((item: any, index: number) => (
              <tr
                key={index}
                className={item.status ? "bg-[#F5F7FA]" : ""}
              >
                <td className="py-2">{item.designation}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-purple-600 hover:opacity-75"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
                <td>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isDeleted}
                      onChange={() => toggleStatus(item)}
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
