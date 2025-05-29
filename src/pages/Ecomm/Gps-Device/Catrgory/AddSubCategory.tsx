import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { getcategoryResult, getCategorys, gpssubcategory, updateGpssubcategory, updatesubCategory } from '../../../../api/ecomm/gpsDevices';

// Validation schema
const schema = yup.object().shape({
  selectedCategory: yup.string().required('Category is required'),
  subCategoryName: yup.string().required('Sub Category Name is required'),
});

const AddSubCategory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const category = useSelector((state: any) => state.gpsDevices?.category);
  const updatesubCategorypayload = useSelector((state: any) => state.gpsDevices?.updatesubCategorypayload);
console.log(updatesubCategorypayload?.subcategory?._id,"updatesubCategorypayload")
  useEffect(() => {
    const fetchCategories = async () => {
      const payload:any={}
      await dispatch(getCategorys(payload));
    };
    fetchCategories();
  }, [dispatch]);

  // Pre-fill form if editing
  useEffect(() => {
    if (updatesubCategorypayload) {
      setValue('subCategoryName', updatesubCategorypayload.subcategory?.subcategory);
      setValue('selectedCategory', updatesubCategorypayload.category?._id);
    }
  }, [updatesubCategorypayload, setValue]);

  const onSubmit = async (data: any) => {
    const payload:any = {
      subcategory: data.subCategoryName,
      category: data.selectedCategory,
    };

    if (updatesubCategorypayload?.subcategory?._id) {
      await dispatch(updateGpssubcategory({ _id: updatesubCategorypayload?.subcategory?._id, ...payload }));
       const payload1:any=null
        await  dispatch(updatesubCategory(payload1))
    } else {

      // Add new
      await dispatch(gpssubcategory(payload));
    }
     const paylload2:any={}
          await dispatch(getcategoryResult(paylload2));

    reset(); // Clear form
   
    
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="font-semibold mb-2">
        {updatesubCategorypayload ? 'Update Sub Category' : 'Add Sub Category'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Category Dropdown */}
        <label className="block text-sm font-medium mb-1">
          Choose Category<span className="text-yellow-500">*</span>
        </label>
        <select
          className="border rounded p-2 w-full mb-2"
          {...register('selectedCategory')}
        >
          <option value="">Select Category</option>
          {category?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.category}
            </option>
          ))}
        </select>
        {errors.selectedCategory && (
          <p className="text-red-500 text-sm mb-2">{errors.selectedCategory.message}</p>
        )}

        {/* Subcategory Input */}
        <label className="block text-sm font-medium mb-1">
          Sub Category Name<span className="text-yellow-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Sub Category Name"
          className="border rounded p-2 w-full"
          {...register('subCategoryName')}
        />
        {errors.subCategoryName && (
          <p className="text-red-500 text-sm mt-1">{errors.subCategoryName.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#1E1E1E] text-[#D9E821] px-8 py-2 rounded mt-4"
        >
          {updatesubCategorypayload ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddSubCategory;
