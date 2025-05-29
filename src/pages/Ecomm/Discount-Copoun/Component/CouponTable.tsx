import React, { useEffect, useState } from 'react'
import { getcoupon, setUpdatecoupon } from '../../../../api/ecomm/coupon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { formatDateToDDMMMYYYYwithTime } from '../../../../common/ManageDate';

function CouponTable() {
  
    const handleToggle = (index:any) => {
    // const updated = [...coupons];
    // updated[index].status = !updated[index].status;
    // setCoupons(updated);
  };
  const couponRecord=useSelector((state:any)=>state?.coupon?.coupon)

  const dispatch=useDispatch<AppDispatch>()
  const getData=async()=>{
try{
  const payload:any={}
await dispatch(getcoupon(payload))
}catch(err){
  console.log(err)
}
  }
  useEffect(()=>{
getData()
  },[])
  const handleUpdate=async(val:any)=>{
    dispatch(setUpdatecoupon(val))
  }
  return (
    <div>
        <h2 className="text-gray-700 font-semibold mb-4">Discount Coupon List</h2>
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
            {couponRecord.map((c:any, i:any) => (
              <tr key={i} className="border-b" onClick={()=>handleUpdate(c)}>
                <td className="p-2">{c.discountCode}</td>
                <td className="p-2">{c.discountPercent}</td>
                <td className="p-2">{c?.discountStart?formatDateToDDMMMYYYYwithTime(c?.discountStart): "NA"}</td>
                <td className="p-2">{c?.discountEnd?formatDateToDDMMMYYYYwithTime(c?.discountEnd):"NA"}</td>
                <td className="p-2 text-center">
                  <button className="text-indigo-500 hover:text-indigo-700">
                    ✏️
                  </button>
                </td>
                <td className="p-2 text-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={c.isDeleted}
                      onChange={() => handleToggle(i)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-400 relative">
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          c.isDeleted ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default CouponTable
