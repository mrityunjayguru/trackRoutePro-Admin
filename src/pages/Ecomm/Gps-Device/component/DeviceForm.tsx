import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addgpsDevices } from "../../../../api/ecomm/gpsDevices";
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
  price: yup
    .number()
    .typeError("Enter a valid price")
    .required("Price is required"),
  skPrice: yup
    .number()
    .typeError("Enter a valid price")
    .required("Sk Price is required"),
});

const DeviceForm = () => {
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [file, setFile] = useState<null | File>(null);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const payload: any = {
      ...data,
      deviceType: data.deviceType === "Wired",
      govtRelated: data.govtRelated === "Yes",
      deviceImage: file,
    };

    await dispatch(addgpsDevices(payload));

    // Reset the form and image/file states
    reset();
    setFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="block text-sm font-medium mb- text-[#585859]">
        Onboard Device
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-4 items-start my-5"
      >
        {/* Device Type */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Device Type
          </label>
          <select {...register("deviceType")} className="w-full border p-2 rounded">
            <option value="">Select type of device</option>
            <option value="Wired">Wired</option>
            <option value="Wireless">Wireless</option>
          </select>
          <p className="text-red-500 text-sm">{errors.deviceType?.message}</p>
        </div>

        {/* Govt Related */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Govt. Related
          </label>
          <select {...register("govtRelated")} className="w-full border p-2 rounded">
            <option value="">Select Approval Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <p className="text-red-500 text-sm">{errors.govtRelated?.message}</p>
        </div>

        {/* Device Image */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Device Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p className="text-xs text-gray-500">Image Size: 150x150</p>
        </div>

        {/* Image Preview */}
        <div className="w-24 h-24 border rounded overflow-hidden">
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          )}
        </div>

        {/* Device Name */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Device Name
          </label>
          <input
            {...register("deviceName")}
            className="w-full p-2 rounded border border-[#A6A6A6]"
          />
          <p className="text-red-500 text-sm">{errors.deviceName?.message}</p>
        </div>

        {/* Sub Text */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Name Sub Text
          </label>
          <input {...register("subText")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.subText?.message}</p>
        </div>

        {/* USP 1 */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Enter USP 1
          </label>
          <input {...register("usp1")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.usp1?.message}</p>
        </div>

        {/* USP 2 */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Enter USP 2
          </label>
          <input {...register("usp2")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.usp2?.message}</p>
        </div>

        {/* USP 3 */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Enter USP 3
          </label>
          <input {...register("usp3")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.usp3?.message}</p>
        </div>

        {/* Price */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Enter Price
          </label>
          <input {...register("price")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>

        {/* Sk Price */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#585859]">
            Price (Sk/distributor)
          </label>
          <input {...register("skPrice")} className="w-full border p-2 rounded" />
          <p className="text-red-500 text-sm">{errors.skPrice?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="col-span-4 mt-4">
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
          >
            Onboard GPS Device
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceForm;
