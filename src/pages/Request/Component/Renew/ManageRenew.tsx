import React from "react";

const ManageRenew = () => {
  return (
    <div className="p-5">
      <h2 className="text-[16px] font-normal mb-4 text-[##000000]">Extend / Renew Subscription(s)</h2>

      <div className="grid grid-cols-5 gap-1 border-b pb-4 mb-4 bg-[#F4F4F4] px-5 py-2">
        <div><strong>IMEI No.</strong> <br /> <span className="font-normal">862408128000853</span></div>
        <div><strong>Vehicle No.</strong> <br /> <span className="font-normal">HR36X3033</span></div>
        <div><strong>Subscriber</strong> <br /> <span className="font-normal">Chitresh Chaudhary</span></div>
        <div><strong>Mobile</strong> <br /> <span className="font-normal">9876543210</span></div>
        <div><strong>Email</strong> <br /> <span className="font-normal">chitreshchaudhary@gmail.com</span></div>
     
      </div>
<div className="grid grid-cols-5 gap-1 pb-4 mb-4">
<div><strong>Request ID</strong> <br /> <span className="font-normal">RR-10003</span></div>
<div><strong>Renewal Date</strong> <br /> <span className="font-normal">18 Feb 2025</span></div>
</div>
      <h3 className="text-[16px] font-normal mb-4 text-[##000000]">Payment Details</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700">Status</label>
          <select className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none">
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Mode</label>
          <select className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none">
            <option>Cash</option>
            <option>Online</option>
          </select>
        </div>
        <div className="">
          <label className="block text-gray-700">Online Transaction ID</label>
          <input type="text" className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none" placeholder="Enter Transaction ID" />
        </div>
      </div>

      <h3 className="text-[16px] font-normal mb-4 text-[##000000]">Extend Date</h3>
      <div className="w-1/2">
        <label className="block text-gray-700">New Subscription Date</label>
        <input type="text" className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none" placeholder="DD/MM/YY" />
      </div>

      <div className="w-full mt-5">
      <button className="w-[200px] bg-[#000000] text-[#D9E821] py-2 rounded-lg font-medium transition ">Save</button>
      </div>
    </div>
  );
};

export default ManageRenew;
