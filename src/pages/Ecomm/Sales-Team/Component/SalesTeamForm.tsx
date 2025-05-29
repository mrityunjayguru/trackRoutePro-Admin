import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getdesignation } from '../../../../api/ecomm/designation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import {
  addSalesTeam,
  setupdatesalesTeam,
  updateSalesTeams,
} from '../../../../api/ecomm/salesTeam';

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  designation: yup.string(),
  operatingArea: yup.string(),
  discountPercent: yup.string(),
  discountValue: yup.string(),
  discountCode: yup.string(),
});

const SalesTeamForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const updateSalesTeam = useSelector(
    (state: any) => state?.slesTeame?.updateSalesTeam,
  );
  const records = useSelector((state: any) => state?.designation?.designation);

  const isEditMode = Boolean(updateSalesTeam?._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
    };

    if (isEditMode) {
      payload._id = updateSalesTeam._id;
    }
    if (isEditMode) {
      await dispatch(updateSalesTeams(payload));
    } else {
      await dispatch(addSalesTeam(payload));
    }
    const val:any=null
  await dispatch(setupdatesalesTeam(val))

    reset(); // clear form after submission
  };

  const getRecords = async () => {
    const payload: any = {};
    await dispatch(getdesignation(payload));
  };

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    if (updateSalesTeam?._id) {
      reset({
        fullName: updateSalesTeam.fullName || '',
        designation: updateSalesTeam.designation || '',
        operatingArea: updateSalesTeam.operatingArea || '',
        discountPercent: updateSalesTeam?.couponData?.discountPercent || '',
        discountValue: updateSalesTeam?.couponData?.discountValue || '',
        discountCode: updateSalesTeam.discountCode || '',
      });
    }
  }, [updateSalesTeam]);

  return (
    <div className="max-w-5xl ">
      <h2 className="text-lg font-semibold text-[#585859] mb-6">
        {isEditMode ? 'Update Employee' : 'Onboard Employee'}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 text-sm text-[#585859]"
      >
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">
            Full Name<span className="text-yellow-500">*</span>
          </label>
          <input
            {...register('fullName')}
            placeholder="Enter full name"
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD] focus:outline-none"
          />
          <p className="text-red-500 text-xs">{errors.fullName?.message}</p>
        </div>

        {/* Employee Code (static) */}
        <div>
          {updateSalesTeam && (
            <div>
              <label className="block mb-1 font-medium">Employee Code</label>
              <div className="px-3 py-2 border rounded text-[#585859] bg-gray-50">
                {updateSalesTeam?.employeecode}
              </div>
            </div>
          )}
        </div>

        {/* Designation */}
        <div>
          <label className="block mb-1 font-medium">Designation</label>
          <select
            {...register('designation')}
            className="w-full border rounded px-3 py-2 text-[#585859] placeholder:text-[#C8CEDD]"
          >
            <option value="">Select Designation</option>
            {records.map((val: any, i: number) => (
              <option key={i} value={val._id}>
                {val.designation}
              </option>
            ))}
          </select>
        </div>

        {/* Operating Area */}
        <div>
          <label className="block mb-1 font-medium">Operating Area</label>
          <input
            {...register('operatingArea')}
            placeholder="Enter Location"
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
          />
        </div>

        {/* Discount */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Discount</label>
            <input
              {...register('discountPercent')}
              placeholder="%"
              className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium text-transparent">
              or
            </label>
            <input
              {...register('discountValue')}
              placeholder="Amount"
              className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
            />
          </div>
        </div>

        {/* Coupon Code */}
        <div>
          <label className="block mb-1 font-medium">Coupon Code</label>
          <input
            {...register('discountCode')}
            placeholder="Enter code"
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-[#1E1E1E] text-[#D9E821] px-8 py-2 rounded mt-4"
          >
            {isEditMode ? 'Update Employee' : 'Onboard Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesTeamForm;
