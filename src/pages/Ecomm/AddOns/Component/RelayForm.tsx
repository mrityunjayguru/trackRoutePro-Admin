import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import {
  addrelaySecurity,
  getrelaySecurity,
  updaterelaySecurity, // ✅ assume this exists
} from '../../../../api/ecomm/relaySecurity';

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required('Device name is required'),
  price: yup
    .number()
    .typeError('Rate must be a number')
    .required('Rate is required'),
  status: yup.string().required('Status selection is required'),
});

type FormValues = {
  title: string;
  price: number;
  status: string;
};

const RelayForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const relay = useSelector((state: any) => state?.relaySecurity?.relaySecurity);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  // Load data into form if record exists
  useEffect(() => {
    if (relay && relay.length > 0) {
      const data = relay[0]; // assuming relay is an array
      setIsEditMode(true);
      setValue('title', data.title);
      setValue('price', data.price);
      setValue('status', data.status ? 'On' : 'Off');
    }
  }, [relay, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload:any = {
        ...data,
        status: data.status === 'On',
      };

      if (isEditMode) {
        // Call update API
        await dispatch(updaterelaySecurity({ ...payload, _id: relay[0]._id }));
        getRecords()
      } else {
        await dispatch(addrelaySecurity(payload));
        getRecords()
      }

      reset();
      setIsEditMode(false);
    } catch (err) {
      console.error('Form submission failed:', err);
    }
  };

  const getRecords = async () => {
    try {
      const payload:any={}
      await dispatch(getrelaySecurity(payload));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="w-[70%]">
      <h2 className="text-lg font-semibold mb-4 text-[#585859]">
        {isEditMode ? 'Update Relay (Anti Theft Device)' : 'Edit Relay (Anti Theft Device)'}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 items-start"
      >
        {/* Title */}
        <div className="col-span-1">
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register('title')}
            className="w-full border p-2 rounded"
            placeholder="Enter device title"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>

        {/* Rate in INR */}
        <div className="col-span-1">
          <label className="block text-sm font-medium">Rate in INR*</label>
          <input
            type="number"
            {...register('price')}
            className="w-full border p-2 rounded"
            placeholder="Enter price"
          />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>

        {/* Auto Select On/Off */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Auto Select On/Off</label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="On"
                {...register('status')}
                className="accent-black"
              />
              On
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Off"
                {...register('status')}
                className="accent-black"
              />
              Off
            </label>
          </div>
          <p className="text-red-500 text-sm mt-1">{errors.status?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
          >
            {isEditMode ? 'Update Relay' : 'Add Relay'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RelayForm;
