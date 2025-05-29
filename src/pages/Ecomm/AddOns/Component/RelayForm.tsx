import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
  deviceName: yup.string().required('Device name is required'),
  subText: yup.string().required('Sub text is required'),
  govtRelated: yup.string().required('Auto select is required'),
});

const RelayForm = () => {
  const [imagePreview, setImagePreview] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    alert('Device updated successfully!');
  };

  return (
    <div className="w-[70%]">
      <h2 className="text-lg font-semibold mb-4 text-[#585859]">
        Edit Relay (Anti Theft Device)
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 items-start"
      >
        {/* Title */}
        <div className="col-span-1">
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register('deviceName')}
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.deviceName?.message}</p>
        </div>

        {/* Rate in INR */}
        <div className="col-span-1">
          <label className="block text-sm font-medium">Rate in INR*</label>
          <input
            {...register('subText')}
            className="w-full border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.subText?.message}</p>
        </div>

        {/* Auto Select Radio */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Auto Select On/Off</label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="On"
                {...register('govtRelated')}
                className="accent-black"
              />
              On
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Off"
                {...register('govtRelated')}
                className="accent-black"
              />
              Off
            </label>
          </div>
          <p className="text-red-500 text-sm mt-1">{errors.govtRelated?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
          >
            Edit Relay
          </button>
        </div>
      </form>
    </div>
  );
};

export default RelayForm;
