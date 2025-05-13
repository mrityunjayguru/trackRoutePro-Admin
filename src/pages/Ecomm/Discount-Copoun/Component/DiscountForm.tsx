// import React, { useState } from 'react';
// import { Pencil } from 'lucide-react';
// import { Switch } from '@headlessui/react';

// const CouponManager = () => {
//   const [coupons, setCoupons] = useState([
//     { code: 'megasale40', discount: 40, start: '15 Apr 25', end: '25 Apr 25', active: false },
//     { code: 'diwalimela20', discount: 20, start: '15 Oct 25', end: '30 Oct 25', active: true },
//     { code: 'justsale10', discount: 10, start: '1 May 25', end: '7 May 25', active: true },
//   ]);

//   const toggleStatus = (index: number) => {
//     const updated = [...coupons];
//     updated[index].active = !updated[index].active;
//     setCoupons(updated);
//   };

//   return (
//     <div className="flex gap-8 flex-wrap p-6">
//       {/* Left Form */}
//       <div className="w-full md:w-[350px]">
//         <h2 className="text-base font-semibold mb-4">Create Coupon</h2>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Discount Code*</label>
//             <input
//               type="text"
//               placeholder="Enter Code"
//               className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Discount</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="%"
//                 className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//               />
//               <span className="text-gray-500 text-sm pt-2">or</span>
//               <input
//                 type="text"
//                 placeholder="Amount"
//                 className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <div className="w-1/2">
//               <label className="block text-sm font-medium">Discount Start*</label>
//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="block text-sm font-medium">Discount End*</label>
//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-black text-yellow-400 font-semibold text-sm py-2 px-4 rounded"
//           >
//             Add Designation
//           </button>
//         </form>
//       </div>

//       {/* Right Table */}
//       <div className="flex-1 min-w-[350px]">
//         <h2 className="text-base font-semibold mb-4">Discount Coupon List</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm border-collapse">
//             <thead>
//               <tr className="border-b text-left text-gray-700">
//                 <th className="p-2">Code</th>
//                 <th className="p-2">Discount</th>
//                 <th className="p-2">Start</th>
//                 <th className="p-2">End</th>
//                 <th className="p-2">Edit</th>
//                 <th className="p-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {coupons.map((coupon, index) => (
//                 <tr key={coupon.code} className="border-b hover:bg-gray-50">
//                   <td className="p-2 font-medium">{coupon.code}</td>
//                   <td className="p-2">{coupon.discount}</td>
//                   <td className="p-2">{coupon.start}</td>
//                   <td className="p-2">{coupon.end}</td>
//                   <td className="p-2">
//                     <button className="text-purple-600 hover:text-purple-800">
//                       <Pencil size={16} />
//                     </button>
//                   </td>
//                   <td className="p-2">
//                     <Switch
//                       checked={coupon.active}
//                       onChange={() => toggleStatus(index)}
//                       className={`${
//                         coupon.active ? 'bg-yellow-400' : 'bg-gray-300'
//                       } relative inline-flex h-5 w-10 items-center rounded-full transition`}
//                     >
//                       <span className="sr-only">Toggle</span>
//                       <span
//                         className={`${
//                           coupon.active ? 'translate-x-5' : 'translate-x-1'
//                         } inline-block h-3 w-3 transform rounded-full bg-white transition`}
//                       />
//                     </Switch>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CouponManager;


import React from 'react'

export default function DiscountForm() {
  return (
    <div>
      sssssssssss
    </div>
  )
}
