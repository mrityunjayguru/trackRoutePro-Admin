import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { getcategoryResult, gpscategory, handleupdateCategory, updateCategory } from '../../../../api/ecomm/gpsDevices';

// Yup validation schema
const schema = yup.object().shape({
  categoryName: yup.string().required('Category Name is required'),
});

const AddCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const updateCategorypayload = useSelector(
    (state: any) => state.gpsDevices?.updateCategorypayload
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Populate form if updating
  useEffect(() => {
    if (updateCategorypayload) {
      setValue('categoryName', updateCategorypayload.name || '');
    }
  }, [updateCategorypayload, setValue]);

  const onSubmit = async (data: any) => {
    if (updateCategorypayload?._id) {
      const payload:any={
        _id: updateCategorypayload._id, 
        categoryName:data.categoryName
      }
      await dispatch(handleupdateCategory(payload));
      const payload2:any=null
        await  dispatch(updateCategory(payload2))
      
    } else {
      await dispatch(gpscategory(data));
    }
     const paylload2:any={}
          await dispatch(getcategoryResult(paylload2));
    reset(); // Clear form
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="font-semibold mb-2">
        {updateCategorypayload ? 'Update Category' : 'Add Category'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-sm font-medium mb-1">
          Category Name<span className="text-yellow-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Category Name"
          className="border rounded p-2 w-full"
          {...register('categoryName')}
        />
        {errors.categoryName && (
          <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>
        )}

        <button
          type="submit"
          className="bg-[#1E1E1E] text-[#D9E821] px-8 py-2 rounded mt-4"
        >
          {updateCategorypayload ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
