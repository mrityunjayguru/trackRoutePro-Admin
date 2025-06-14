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
import { decrypt } from '../../../../Utils/PasswordDesc'; // Ensure this path is correct
import { FaTimesCircle } from 'react-icons/fa'; // Import the cross icon

// ✅ Validation schema with password
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  // salesteamPhoto is not a form field, so it shouldn't be in the schema
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
  // discountValue: yup.string(),
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
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    context: { isEditMode },
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  // Removed showPasswordField as it's not being used to control visibility
  const [backendPhotoUrl, setBackendPhotoUrl] = useState<string | null>(null); // State for the photo URL from the backend

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setBackendPhotoUrl(null); // Clear backend photo if a new file is selected
    } else {
      setPhoto(null);
      // If no file selected, and we are in edit mode with an existing photo, restore its preview
      if (isEditMode && updateSalesTeam?.photoUrl) {
          setBackendPhotoUrl(updateSalesTeam.photoUrl);
          setPhotoPreview(`${import.meta.env.VITE_APP_Image_Url}${updateSalesTeam.photoUrl}`);
      } else {
          setPhotoPreview(null);
          setBackendPhotoUrl(null);
      }
    }
  };

  const handleClearPhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setBackendPhotoUrl(null); // Clear backend photo reference
    // Optionally, clear the file input field for a complete reset visually
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = async (data: any) => {
    const formData: any = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'password') {
        if (value) {
          formData.append(key, value);
        }
      } else if (value) {
        formData.append(key, value);
      }
    });

    if (photo) { // A new file has been selected by the user
      formData.append('photo', photo);
    } else if (isEditMode && !backendPhotoUrl && updateSalesTeam?.photoUrl) {
      // If in edit mode, no new photo selected, and backendPhotoUrl is cleared,
      // it means the user explicitly removed the old photo.
      // You'll need to tell your backend to remove the photo.
      // A common way is to send a specific flag or an empty string for the photo field.
      // For example, if your backend expects 'photo: ""' to delete the photo:
      formData.append('photo', ''); // Or a specific flag like 'removePhoto: true'
    } else if (isEditMode && backendPhotoUrl) {
        // If in edit mode and no new photo, but backendPhotoUrl exists,
        // it means the photo was not changed, so don't append anything to formData for 'photo'.
        // The backend should retain the existing photo.
    }


    if (isEditMode) {
      formData.append('_id', updateSalesTeam._id);
      await dispatch(updateSalesTeams(formData));
    } else {
      await dispatch(addSalesTeam(formData));
    }

    const payload: any = null;
    await dispatch(setupdatesalesTeam(payload));
    setPhoto(null);
    setPhotoPreview(null);
    setBackendPhotoUrl(null); // Clear on form submission success
    reset();
  };

  const getRecords = async () => {
    const payload: any = {};
    await dispatch(getdesignation(payload));
  };

  useEffect(() => {
    getRecords();
  }, [dispatch]);

  useEffect(() => {
    const populateForm = async () => {
      if (updateSalesTeam?._id) {
        reset({
          fullName: updateSalesTeam.fullName || '',
          email: updateSalesTeam.email || '',
          phone: updateSalesTeam.phone || '',
          designation: updateSalesTeam.designation || '',
          operatingArea: updateSalesTeam.operatingArea || '',
          discountPercent: updateSalesTeam?.couponData?.discountPercent || '',
          // discountValue: updateSalesTeam?.couponData?.discountValue || '',
          discountCode: updateSalesTeam.discountCode || '',
        });

        if (updateSalesTeam.password) {
          try {
            const decryptedPassword = await decrypt(updateSalesTeam.password);
            setValue('password', decryptedPassword);
          } catch (error) {
            console.error("Error decrypting password:", error);
            setValue('password', '');
          }
        } else {
          setValue('password', '');
        }

        if (updateSalesTeam?.photoUrl) {
          setBackendPhotoUrl(updateSalesTeam.photoUrl); // Store backend URL
          setPhotoPreview(`${import.meta.env.VITE_APP_Image_Url}${updateSalesTeam.photoUrl}`);
        } else {
          setPhotoPreview(null);
          setBackendPhotoUrl(null);
        }
      } else {
        reset();
        setPhoto(null);
        setPhotoPreview(null);
        setBackendPhotoUrl(null);
      }
    };
    populateForm();
  }, [updateSalesTeam, reset, setValue]);

  // Determine which preview to show: new uploaded photo or existing backend photo
  const currentPhotoToDisplay = photoPreview || (backendPhotoUrl ? `${import.meta.env.VITE_APP_Image_Url}${backendPhotoUrl}` : null);


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

        {/* Password - Always visible, but required only for new entries */}
        <div>
          <label className="block mb-1 font-medium">
            Password{isEditMode ? '' : <span className="text-yellow-500">*</span>}
          </label>
          <input
            type="text"
            {...register('password')}
            placeholder={isEditMode ? "Leave blank to keep current" : "Enter password"}
            className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
          />
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>

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
          {/* <div className="w-1/2">
            <label className="block mb-1 font-medium text-transparent">Value</label>
            <input
              {...register('discountValue')}
              placeholder="Amount"
              className="w-full border rounded px-3 py-2 placeholder:text-[#C8CEDD]"
            />
          </div> */}
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

        {/* Photo Upload and Preview */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Upload Photo</label>
          <input
            type="file"
            id="photo-upload" // Added ID for clearing the input field
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
          />
          {currentPhotoToDisplay && (
            <div className="mt-3 relative w-fit"> {/* Added relative and w-fit */}
              <p className="mb-1 text-sm">Preview:</p>
              <img
                src={currentPhotoToDisplay}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
              <button
                type="button" // Important: type="button" to prevent form submission
                onClick={handleClearPhoto}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                aria-label="Remove photo"
              >
                <FaTimesCircle size={20} />
              </button>
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