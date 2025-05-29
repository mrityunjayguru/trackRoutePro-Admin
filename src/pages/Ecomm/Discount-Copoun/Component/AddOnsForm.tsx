import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Pencil } from 'lucide-react';

const CouponManager = () => {
  const [coupons, setCoupons] = useState([
    { code: 'megasale40', discount: 40, start: '15 Apr 25', end: '25 Apr 25', active: false },
    { code: 'diwalimela20', discount: 20, start: '15 Oct 25', end: '30 Oct 25', active: true },
    { code: 'justsale10', discount: 10, start: '1 May 25', end: '7 May 25', active: true },
  ]);

  const toggleStatus = (index: number) => {
    const updated = [...coupons];
    updated[index].active = !updated[index].active;
    setCoupons(updated);
  };

  return (
    <div className="flex flex-wrap gap-8 p-6 w-full">
      {/* Create Coupon */}
      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create Coupon</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Discount Code*</label>
            <input
              type="text"
              placeholder="Enter Code"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="%"
              className="w-1/2 border border-gray-300 rounded px-4 py-2"
            />
            <span className="py-2">or</span>
            <input
              type="number"
              placeholder="Amount"
              className="w-1/2 border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Discount Start*</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Discount End*</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-yellow-400 font-semibold py-2 px-6 rounded mt-4"
          >
            Add Designation
          </button>
        </form>
      </div>

      {/* Discount Coupon List */}
      <div className="flex-1 min-w-[300px]">
        <h2 className="text-lg font-semibold mb-4">Discount Coupon List</h2>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Code</th>
              <th className="p-2">Discount</th>
              <th className="p-2">Start</th>
              <th className="p-2">End</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon.code} className="border-b hover:bg-gray-50">
                <td className="p-2">{coupon.code}</td>
                <td className="p-2">{coupon.discount}</td>
                <td className="p-2">{coupon.start}</td>
                <td className="p-2">{coupon.end}</td>
                <td className="p-2">
                  <button className="text-purple-600">
                    <Pencil size={18} />
                  </button>
                </td>
                <td className="p-2">
                  <Switch
                    checked={coupon.active}
                    onChange={() => toggleStatus(index)}
                    className={`${
                      coupon.active ? 'bg-yellow-400' : 'bg-gray-300'
                    } relative inline-flex h-5 w-10 items-center rounded-full`}
                  >
                    <span className="sr-only">Toggle Status</span>
                    <span
                      className={`${
                        coupon.active ? 'translate-x-5' : 'translate-x-1'
                      } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponManager;
