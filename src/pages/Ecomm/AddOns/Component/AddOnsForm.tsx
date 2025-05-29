import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addaddOns, updateaddOns } from '../../../../api/ecomm/addOns'; // Make sure updateaddOns exists
import { getGpsDevices } from '../../../../api/ecomm/gpsDevices';

// ✅ Validation schema
const schema = yup.object().shape({
  selectedDevice: yup.string().required('Device is required'),
  secondYearCost: yup.number().typeError('Must be a number').required('Required'),
  secondYearDiscount: yup.string().required('Required'),
  thirdYearCost: yup.number().typeError('Must be a number').required('Required'),
  thirdYearDiscount: yup.string().required('Required'),
  fifthYearCost: yup.number().typeError('Must be a number').required('Required'),
  fifthYearDiscount: yup.string().required('Required'),
  bestValue: yup.string().required('Select one best value'),
});

const AddonForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const deviceData = useSelector((state: any) => state?.gpsDevices?.gpsDevices || []);
  const updateData = useSelector((state: any) => state.addOns?.singleaddOns);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const bestValue = watch('bestValue');

  // Fetch GPS Devices on mount
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const payload: any = {};
        await dispatch(getGpsDevices(payload));
      } catch (err) {
        console.error('Error fetching devices:', err);
      }
    };
    fetchDevices();
  }, [dispatch]);

  // Prefill form if updating
  useEffect(() => {
    if (updateData) {
      const fields = [
        'selectedDevice',
        'secondYearCost',
        'secondYearDiscount',
        'thirdYearCost',
        'thirdYearDiscount',
        'fifthYearCost',
        'fifthYearDiscount',
        'bestValue',
      ];
      fields.forEach((field) => {
        if (updateData[field]) {
          setValue(field, updateData[field]);
        }
      });
    }
  }, [updateData, setValue]);

  // Submit handler
  const onSubmit = async (data: any) => {
    try {
      if (updateData?._id) {
        await dispatch(updateaddOns({ ...data, _id: updateData._id }));
      } else {
        await dispatch(addaddOns(data));
      }
      reset();
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-lg font-medium mb-4 text-[#585859]">Onboard Add-ons</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[70%]">
        {/* 🔘 Device Dropdown */}
        <div className="mb-4">
          <label className="block text-[#585859] text-sm font-normal">Select Device*</label>
          <select
            {...register('selectedDevice')}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          >
            <option value="">Select device</option>
            {deviceData.map((val: any) => (
              <option key={val._id} value={val._id}>
                {val.deviceName}
              </option>
            ))}
          </select>
          {errors.selectedDevice && (
            <p className="text-red-500 text-sm">{errors.selectedDevice.message}</p>
          )}
        </div>

        {/* 🧾 Plan Inputs */}
        {[
          { label: '2nd Year', name: 'secondYearCost', discount: 'secondYearDiscount' },
          { label: '3 Year Plan', name: 'thirdYearCost', discount: 'thirdYearDiscount' },
          { label: '5 Year Plan', name: 'fifthYearCost', discount: 'fifthYearDiscount' },
        ].map(({ label, name, discount }) => (
          <div key={name} className="flex items-start gap-4 mb-4">
            {/* 💰 Cost */}
            <div className="flex-1">
              <label className="block text-[#585859] text-sm font-normal">{label}</label>
              <input
                type="number"
                {...register(name)}
                placeholder="Enter cost in INR"
                className="border border-gray-300 px-4 py-2 rounded w-full"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]?.message}</p>
              )}
            </div>

            {/* 🔻 Discount */}
            <div className="flex-1">
              <label className="block text-[#585859] text-sm font-normal">
                Discount - {label}
              </label>
              <input
                type="text"
                {...register(discount)}
                placeholder="Enter offered discount"
                className="border border-gray-300 px-4 py-2 rounded w-full"
              />
              {errors[discount] && (
                <p className="text-red-500 text-sm">{errors[discount]?.message}</p>
              )}
            </div>

            {/* ⭐ Best Value Radio */}
            <div className="flex items-center pt-6">
              <input
                type="radio"
                value={name}
                {...register('bestValue')}
                checked={bestValue === name}
                className="mr-2 accent-purple-600"
              />
              <label className="text-[#585859] text-sm font-normal">Best Value Badge</label>
            </div>
          </div>
        ))}

        {/* 🛑 Best Value Error */}
        {errors.bestValue && (
          <p className="text-red-500 text-sm mb-2">{errors.bestValue.message}</p>
        )}

        {/* ✅ Submit */}
        <div className="col-span-4 mt-4">
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
          >
            {updateData?._id ? 'Update Add-ons' : 'Onboard GPS Device'}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddonForm;
