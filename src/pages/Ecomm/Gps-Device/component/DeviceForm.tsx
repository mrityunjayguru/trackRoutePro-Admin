import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addgpsDevices,
  getCategorys,
  getGpsSubcaegory,
  setUpdateGpsDevices,
  updateGpsDevices,
} from "../../../../api/ecomm/gpsDevices";
import { AppDispatch } from "../../../../store/store";

// Validation schema
const schema = yup.object().shape({
  deviceType: yup.string().required("Device type is required"),
  govtRelated: yup.string().required("Govt status is required"),
  deviceName: yup.string().required("Device name is required"),
  subText: yup.string().required("Sub text is required"),
  usp1: yup.string().required("USP 1 is required"),
  usp2: yup.string().required("USP 2 is required"),
  usp3: yup.string().required("USP 3 is required"),
  price: yup.number().typeError("Enter a valid price").required("Price is required"),
  skPrice: yup.number().typeError("Enter a valid price").required("Sk Price is required"),
  categoryId: yup.string().required("Category is required"),
  subcategoryId: yup.string().required("Subcategory is required"),
});

const DeviceForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const category = useSelector((state: any) => state.gpsDevices?.category);
  const subcategory = useSelector((state: any) => state.gpsDevices?.subcategoryresult);
  console.log(subcategory,"subcategorysubcategory")
  const updatedPayload = useSelector((state: any) => state.gpsDevices?.updateDevice);
  const isEditMode = Boolean(updatedPayload?._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (updatedPayload) {
      reset({
        deviceType: updatedPayload.deviceType ? "Wired" : "Wireless",
        govtRelated: updatedPayload.govtRelated ? "Yes" : "No",
        deviceName: updatedPayload.deviceName || "",
        subText: updatedPayload.subText || "",
        usp1: updatedPayload.usp1 || "",
        usp2: updatedPayload.usp2 || "",
        usp3: updatedPayload.usp3 || "",
        price: updatedPayload.price || "",
        skPrice: updatedPayload.skPrice || "",
        categoryId: updatedPayload.category?._id || "",
        subcategoryId: updatedPayload.subcategory?._id || "",
      });

      if (updatedPayload.deviceImage) {
        const imageUrl = `${import.meta.env.VITE_APP_Image_Url}${updatedPayload.deviceImage}`;
        setImagePreview(imageUrl);
      } else {
        setImagePreview(null);
      }
    }
  }, [updatedPayload]);

  const onSubmit = async (data: any) => {
    const payload: any = {
      ...data,
      deviceType: data.deviceType === "Wired",
      govtRelated: data.govtRelated === "Yes",
      deviceImage: file ? file : updatedPayload?.deviceImage,
      category: data.categoryId,
      subcategory: data.subcategoryId,
    };

    if (isEditMode) {
      payload._id = updatedPayload._id;
      await dispatch(updateGpsDevices(payload));
    } else {
      await dispatch(addgpsDevices(payload));
    }
const payload2:any={}
    // Clear form and redux state
    await dispatch(setUpdateGpsDevices(payload2));
    reset();
    setFile(null);
    setImagePreview(null);

    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const fetchCategoryData = async () => {
    const payload:any={}
    await dispatch(getCategorys(payload));
    await dispatch(getGpsSubcaegory(payload));
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <div className="max-w-6xl ">
      <h2 className="block text-sm font-medium text-[#585859]">
        {isEditMode ? "Update Device" : "Onboard Device"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-4 items-start my-5"
      >
        {/* Device Type */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Device Type</label>
          <select {...register("deviceType")} className="w-full border p-2 rounded">
            <option value="">Select type of device</option>
            <option value="Wired">Wired</option>
            <option value="Wireless">Wireless</option>
          </select>
          <p className="text-red-500 text-sm">{errors.deviceType?.message}</p>
        </div>

        {/* Govt Related */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Govt. Related</label>
          <select {...register("govtRelated")} className="w-full border p-2 rounded">
            <option value="">Select Approval Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <p className="text-red-500 text-sm">{errors.govtRelated?.message}</p>
        </div>

        {/* Image Upload */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Device Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p className="text-xs text-gray-500">Image Size: 150x150</p>
        </div>

        {/* Image Preview */}
        <div className="w-24 h-24 border rounded overflow-hidden">
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          )}
        </div>

        {/* Category */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Category</label>
          <select {...register("categoryId")} className="w-full border p-2 rounded">
            <option value="">Select a category</option>
            {category?.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.categoryId?.message}</p>
        </div>

        {/* Subcategory */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Subcategory</label>
          <select {...register("subcategoryId")} className="w-full border p-2 rounded">
            <option value="">Select a subcategory</option>
            {subcategory?.map((sub: any) => (
              <option key={sub._id} value={sub._id}>
                {sub.subcategory}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.subcategoryId?.message}</p>
        </div>

        {/* Device Name */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Device Name</label>
          <input {...register("deviceName")} className="w-full p-2 rounded border" />
          <p className="text-red-500 text-sm">{errors.deviceName?.message}</p>
        </div>

        {/* Sub Text */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Name Sub Text</label>
          <input {...register("subText")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.subText?.message}</p>
        </div>

        {/* USPs */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Enter USP 1</label>
          <input {...register("usp1")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.usp1?.message}</p>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Enter USP 2</label>
          <input {...register("usp2")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.usp2?.message}</p>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Enter USP 3</label>
          <input {...register("usp3")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.usp3?.message}</p>
        </div>

        {/* Price Fields */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Enter Price</label>
          <input {...register("price")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">Price (Sk/distributor)</label>
          <input {...register("skPrice")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.skPrice?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="col-span-4 mt-4">
          <button
            type="submit"
            className="bg-black text-[#D9E821] py-2 px-6 rounded hover:bg-gray-800"
          >
            {isEditMode ? "Update Device" : "Onboard GPS Device"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceForm;
