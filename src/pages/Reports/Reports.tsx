import { useNavigate } from "react-router-dom";
import SummaryFilter from "./component/SelectHeaders";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { SummaryType } from "../../api/Reports";

export default function Reports() {
  const navigate=useNavigate()
  const dispatch=useDispatch<AppDispatch>()
  const reports = [
    { name: "Summary", icon: "📊" },
    { name: "Travel Report", icon: "🗺️" },
    { name: "Trip Report", icon: "📍" },
    { name: "Stop Idle Report", icon: "⏳" },
    { name: "Distance Report", icon: "📏" },
      {name:'Alerts Report',icon: "📏"}
  ];
const handleclick=(report:any)=>{
  dispatch(SummaryType(report))
  navigate("/Reports/records")
}
  return (
    <div className="p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Select a Report</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        {reports.map((report, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={()=>handleclick(report)}
         >
            <span className="text-3xl mb-2">{report.icon}</span>
            <p className="text-sm font-medium">{report.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
