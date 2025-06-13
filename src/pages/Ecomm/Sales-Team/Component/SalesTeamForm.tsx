import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import {
  addSalesTeam,
  setupdatesalesTeam,
  updateSalesTeams,
} from '../../../../api/ecomm/salesTeam';
import { getdesignation } from '../../../../api/ecomm/designation';

// ✅ Validation schema with password
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: yup.string().when('$isEditMode', {
    is: false,
    then: (schema) => schema.required('Password is required').min(6, 'Min 6 characters'),
    otherwise: (schema) => schema.notRequired(),
  }),
  designation: yup.string(),
  operatingArea: yup.string(),
  discountPercent: yup.string(),
  discountValue: yup.string(),
  discountCode: yup.string(),
});

const SalesTeamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const updateSalesTeam = useSelector((state: any) => state?.slesTeame?.updateSalesTeam);
  const records = useSelector((state: any) => state?.designation?.designation);
  const isEditMode = Boolean(updateSalesTeam?._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    context: { isEditMode },
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: any) => {
    const formData: any = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (photo) {
      formData.append('photo', photo);
    }

    if (isEditMode) {
      formData.append('_id', updateSalesTeam._id);
      await dispatch(updateSalesTeams(formData));
    } else {
      await dispatch(addSalesTeam(formData));
    }
const payload:any=null
    await dispatch(setupdatesalesTeam(payload));
    // setPhoto(null);
    // setPhotoPreview(null);
    // reset();
  };

  const getRecords = async () => {
    const payload:any={}
    await dispatch(getdesignation(payload));
  };

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    if (updateSalesTeam?._id) {
      reset({
        fullName: updateSalesTeam.fullName || '',
        email: updateSalesTeam.email || '',
        phone: updateSalesTeam.phone || '',
        designation: updateSalesTeam.designation || '',
        operatingArea: updateSalesTeam.operatingArea || '',
        discountPercent: updateSalesTeam?.couponData?.discountPercent || '',
        discountValue: updateSalesTeam?.couponData?.discountValue || '',
        discountCode: updateSalesTeam.discountCode || '',
      });
      if (updateSalesTeam?.photoUrl) {
        setPhotoPreview(updateSalesTeam.photoUrl);
      }
    }
  }, [updateSalesTeam]);

  return (
    <div className="max-w-5xl">
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
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
          />
          <p className="text-red-500 text-xs">{errors.fullName?.message}</p>
        </div>

        {/* Employee Code */}
        <div>
          {isEditMode && (
            <>
              <label className="block mb-1 font-medium">Employee Code</label>
              <div className="px-3 py-2 border rounded bg-gray-50">
                {updateSalesTeam?.employeecode}
              </div>
            </>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">
            Email<span className="text-yellow-500">*</span>
          </label>
          <input
            {...register('email')}
            placeholder="Enter email"
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">
            Phone Number<span className="text-yellow-500">*</span>
          </label>
          <input
            {...register('phone')}
            placeholder="Enter phone number"
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
          />
          <p className="text-red-500 text-xs">{errors.phone?.message}</p>
        </div>

        {/* Password */}
        {!isEditMode && (
          <div>
            <label className="block mb-1 font-medium">
              Password<span className="text-yellow-500">*</span>
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter password"
              className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
            />
            <p className="text-red-500 text-xs">{errors.password?.message}</p>
          </div>
        )}

        {/* Designation */}
        <div>
          <label className="block mb-1 font-medium">Designation</label>
          <select
            {...register('designation')}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Designation</option>
            {records?.map((val: any, i: number) => (
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
            placeholder="Enter location"
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
          />
        </div>

        {/* Discount Fields */}
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
            <label className="block mb-1 font-medium text-transparent">or</label>
            <input
              {...register('discountValue')}
              placeholder="Amount"
              className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
            />
          </div>
        </div>

        {/* Discount Code */}
        <div>
          <label className="block mb-1 font-medium">Coupon Code</label>
          <input
            {...register('discountCode')}
            placeholder="Enter code"
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
          />
        </div>

        {/* Photo Upload */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
          />
          {photoPreview && (
            <div className="mt-3">
              <p className="mb-1 text-sm">Preview:</p>
              <img
                src={photoPreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

        {/* Submit */}
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
