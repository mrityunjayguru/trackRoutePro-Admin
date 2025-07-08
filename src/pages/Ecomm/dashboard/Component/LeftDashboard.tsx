import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useEffect } from "react";
import { salesTeamDashboard } from "../../../../api/ecomm/salesTeam";

const LeftDashboard = () => {
  const dashboard=useSelector((state:any)=>state?.slesTeame?.dashboard)
    const data = useSelector((state: any) => state.Auth?.loginUserData);
  const dispatch=useDispatch<AppDispatch>()
  const getData=async()=>{
    try{
      const payload:any={}
      if(data?.designation?.designation=="TSL"){
        Object.assign(payload,{TSL:"TSL"})
        Object.assign(payload,{_id:data?._id})
      }
await dispatch(salesTeamDashboard(payload))
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
getData()
  },[])
  return (
    <div className="p-6 space-y-6 bg-[#ffffff] min-h-screen">
      {/* Revenue Insights Card */}
      <div className="bg-[#F2F6F9] rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-medium text-[#1A1D1F]">Revenue Insights</h2>
          <select className="border rounded px-3 py-1 text-sm">
            <option>Last month</option>
          </select>
        </div>
        <h3 className="text-xl font-bold text-[#000000]">₹ {dashboard?.totalSalesAmount}</h3>
        <p className="text-sm text-[#1A1D1F] mt-1">
          Yaay! Your sales have surged by ₹ {dashboard?.totalSalesAmount} from last month!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Devices Sold */}
          <div className="bg-[#FFFFFF] p-4 rounded-xl  text-center">
            <p className="text-[#1A1D1F] text-sm">Total Devices Sold</p>
            <p className="text-xl font-semibold text-[#000000]">{dashboard?.totalDevicesSold}</p>
          </div>

          {/* Invoices Generated */}
          <div  className="bg-[#FFFFFF] p-4 rounded-xl  text-center">
            <p className="text-[#1A1D1F] text-sm">Total Invoice Generated</p>
            <p className="text-xl font-semibold text-[#000000]">{dashboard?.totalInvoices}</p>
          </div>

          {/* Sales Team */}
          <div  className="bg-[#FFFFFF] p-4 rounded-xl  text-center">
            <p className="text-[#1A1D1F] text-sm">Total Sales Team</p>
            <p className="text-xl font-semibold text-[#000000]">{dashboard?.totalSalesTeam}</p>
          </div>
        </div>
      </div>

      {/* Employee of the Month Card */}
      <div className="bg-[#F2F6F9] rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-medium text-[#1A1D1F]">Employee of the month</h2>
          <select className="border rounded px-3 py-1 text-sm">
            <option>Last month</option>
          </select>
        </div>
        <h3 className="text-lg font-bold text-[#000000]">{dashboard?.highestSales?.name}</h3>
        <p className="text-sm text-[#1A1D1F] font-[400] mt-1">
          for achieving outstanding performance with total sales of ₹ <span className="font-bold">{dashboard?.highestSales?.totalSales}</span> in the last month!
        </p>
      </div>
    </div>
  );
};

export default LeftDashboard;
