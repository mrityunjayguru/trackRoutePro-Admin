import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, UseDispatch,useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addaddOns } from '../../../../api/ecomm/addOns';

// Validation schema using yup
const schema = yup.object().shape({
  selectedDevice: yup.string().required('Device is required'),
  year2: yup.number().typeError('Must be a number').required('Required'),
  discount2: yup.string().required('Required'),
  year3: yup.number().typeError('Must be a number').required('Required'),
  discount3: yup.string().required('Required'),
  year5: yup.number().typeError('Must be a number').required('Required'),
  discount5: yup.string().required('Required'),
  bestValue: yup.string().required('Select one best value'),
});

const AddonForm = () => {
  const dispatch=useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async(data: any) => {
    await dispatch(addaddOns(data))
    reset();
  };
  const bestValue = watch('bestValue');
  return (
    <>
      <div>
        <h2 className="text-lg font-medium mb-4 text-[#585859]">
          Onboard Add-ons
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[70%]  ">
        {/* Device Dropdown */}
        <div className="mb-4">
          <label className="block text-[#585859] text-sm font-normal">
            Select Device*
          </label>
          <select
            {...register('selectedDevice')}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          >
            <option value="">Select device</option>
            <option value="device1">Device 1</option>
            <option value="device2">Device 2</option>
          </select>
          {errors.selectedDevice && (
            <p className="text-red-500 text-sm">
              {errors.selectedDevice.message}
            </p>
          )}
        </div>

        {/* Plans */}
        {[
          { label: '2nd Year', name: 'secondYearCost', discount: 'secondYearDiscount' },
          { label: '3 Year Plan', name: 'thirdYearCost', discount: 'thirdYearDiscount' },
          { label: '5 Year Plan', name: 'fifthYearCost', discount: 'fifthYearDiscount' },
        ].map(({ label, name, discount }) => (
          <div key={name} className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-[#585859] text-sm font-normal">
                {label}
              </label>
              <input
                type="text"
                {...register(name)}
                placeholder="Enter cost in INR"
                className="border border-gray-300 px-4 py-2 rounded w-full"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]?.message}</p>
              )}
            </div>

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
                <p className="text-red-500 text-sm">
                  {errors[discount]?.message}
                </p>
              )}
            </div>

            <div className="flex items-center pt-6">
              <input
                type="radio"
                value={name}
                {...register('bestValue')}
                checked={bestValue === name}
                className="mr-2 accent-purple-600"
              />
              <label className="text-[#585859] text-sm font-normal">
                Best Value Badge
              </label>
            </div>
          </div>
        ))}

        {errors.bestValue && (
          <p className="text-red-500 text-sm mb-2">
            {errors.bestValue.message}
          </p>
        )}

        <div className="col-span-4 mt-4">
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
          >
            Onboard GPS Device
          </button>
        </div>
      </form>
    </>
  );
};

export default AddonForm;
