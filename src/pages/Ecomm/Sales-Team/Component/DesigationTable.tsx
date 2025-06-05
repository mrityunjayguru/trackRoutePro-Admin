import React from 'react'
import { useSelector } from 'react-redux'
import { Pencil } from "lucide-react"; // or use any edit icon from react-icons

function DesigationTable() {
  const records=useSelector((state:any)=>state.designation.designation)
  return (
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
            {records?.map((item:any, index:any) => (
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
                    //   onChange={() => toggleStatus(index)}
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
  )
}

export default DesigationTable
