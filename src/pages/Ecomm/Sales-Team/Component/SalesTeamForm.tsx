import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useForm,
  useFieldArray,
  useWatch,
  Controller,
} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import {
  addSalesTeam,
  setupdatesalesTeam,
  updateSalesTeams,
} from '../../../../api/ecomm/salesTeam';
import {
  getdesignation,
  getSSM,
  getTSL,
} from '../../../../api/ecomm/designation';
import { decrypt } from '../../../../Utils/PasswordDesc';
import { FaTimesCircle } from 'react-icons/fa';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const currentYear = new Date().getFullYear();

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
  SSM: yup.string(),
  TL: yup.string(),
  operatingArea: yup.string(),
  discountPercent: yup.string(),
  discountCode: yup.string(),
  targetQty: yup.array().of(
    yup.object().shape({
      month: yup.string().required(),
      target: yup
        .number()
        .typeError('Target must be a number')
        .required('Target is required'),
    })
  ),
});

const SalesTeamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const updateSalesTeam = useSelector((state: any) => state?.slesTeame?.updateSalesTeam);
  const records = useSelector((state: any) => state?.designation?.designation);
  const SSM = useSelector((state: any) => state?.designation?.SSM);
  const TSL = useSelector((state: any) => state?.designation?.TSL);
  const isEditMode = Boolean(updateSalesTeam?._id);

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [backendPhotoUrl, setBackendPhotoUrl] = useState<string | null>(null);
  const [selectedDesignationName, setSelectedDesignationName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    context: { isEditMode },
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      designation: '',
      SSM: '',
      TL: '',
      operatingArea: '',
      discountPercent: '',
      discountCode: '',
      targetQty: months.map((month) => ({
        month,
        target: 0,
        year: currentYear,
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'targetQty',
  });

  const designationId = useWatch({ control, name: 'designation' });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setBackendPhotoUrl(null);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
      setBackendPhotoUrl(null);
    }
  };

  const handleClearPhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setBackendPhotoUrl(null);
    const input = document.getElementById('photo-upload') as HTMLInputElement;
    if (input) input.value = '';
  };

  const onSubmit = async (data: any) => {
    try {
      const formData:any = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'password') {
          if (value) formData.append(key, value);
        } else if (key === 'targetQty') {
          formData.append('targetQty', JSON.stringify(value));
        } else if (value) {
          formData.append(key, value);
        }
      });

      if (photo) formData.append('photo', photo);
      else if (isEditMode && !backendPhotoUrl && updateSalesTeam?.photoUrl)
        formData.append('photo', '');

      if (isEditMode) {
        formData.append('_id', updateSalesTeam._id);
        await dispatch(updateSalesTeams(formData));
      } else {
        await dispatch(addSalesTeam(formData));
      }
const payload:any=null
      await dispatch(setupdatesalesTeam(payload));
      setPhoto(null);
      setPhotoPreview(null);
      setBackendPhotoUrl(null);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const getRecords = async () => {
    const payload: any = {};
    await dispatch(getdesignation(payload));
    await dispatch(getTSL(payload));
    await dispatch(getSSM(payload));
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
          discountCode: updateSalesTeam.discountCode || '',
          SSM: updateSalesTeam.SSM || '',
          TL: updateSalesTeam.TL || '',
          targetQty: updateSalesTeam.targetQty?.length
            ? updateSalesTeam.targetQty
            : months.map((month) => ({ month, target: 0, year: currentYear })),
        });

        if (updateSalesTeam.password) {
          try {
            const decryptedPassword = await decrypt(updateSalesTeam.password);
            setValue('password', decryptedPassword);
          } catch {
            setValue('password', '');
          }
        }

        if (updateSalesTeam?.photoUrl) {
          setBackendPhotoUrl(updateSalesTeam.photoUrl);
          setPhotoPreview(`${import.meta.env.VITE_APP_Image_Url}${updateSalesTeam.photoUrl}`);
        }
      } else {
        reset();
      }
    };

    populateForm();
  }, [updateSalesTeam, reset, setValue]);

  useEffect(() => {
    const selected = records?.find((rec: any) => rec._id === designationId);
    setSelectedDesignationName(selected?.designation || '');
  }, [designationId, records]);

  const currentPhotoToDisplay =
    photoPreview || (backendPhotoUrl ? `${import.meta.env.VITE_APP_Image_Url}${backendPhotoUrl}` : null);

  return (
    <div className="max-w-5xl">
      <h2 className="text-lg font-semibold mb-6">
        {isEditMode ? 'Update Employee' : 'Onboard Employee'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 text-sm">
        {/* Basic Fields */}
        <div>
          <label className="font-medium">Full Name *</label>
          <input {...register('fullName')} className="w-full border rounded px-3 py-2" />
          <p className="text-red-500 text-xs">{errors.fullName?.message}</p>
        </div>

        {isEditMode && (
          <div>
            <label className="font-medium">Employee Code</label>
            <div className="border px-3 py-2 rounded bg-gray-100">
              {updateSalesTeam?.employeecode}
            </div>
          </div>
        )}

        <div>
          <label className="font-medium">Email *</label>
          <input {...register('email')} className="w-full border rounded px-3 py-2" />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>

        <div>
          <label className="font-medium">Phone Number *</label>
          <input {...register('phone')} className="w-full border rounded px-3 py-2" />
          <p className="text-red-500 text-xs">{errors.phone?.message}</p>
        </div>

        <div>
          <label className="font-medium">Password {isEditMode ? '' : '*'}</label>
          <input {...register('password')} className="w-full border rounded px-3 py-2" />
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>

        {/* Designation */}
        <div>
          <label className="font-medium">Designation</label>
          <select {...register('designation')} className="w-full border rounded px-3 py-2">
            <option value="">Select Designation</option>
            {records?.map((d: any) => (
              <option key={d._id} value={d._id}>
                {d.designation}
              </option>
            ))}
          </select>
        </div>

        {(selectedDesignationName === 'TSL' || selectedDesignationName === 'SRO') && (
          <div>
            <label className="font-medium">Choose SSM</label>
            <select {...register('SSM')} className="w-full border rounded px-3 py-2">
              <option value="">Select SSM</option>
              {SSM?.map((s: any) => (
                <option key={s._id} value={s._id}>
                  {s.fullName}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedDesignationName === 'SRO' && (
          <div>
            <label className="font-medium">Choose TL</label>
            <select {...register('TL')} className="w-full border rounded px-3 py-2">
              <option value="">Select TL</option>
              {TSL?.map((t: any) => (
                <option key={t._id} value={t._id}>
                  {t.fullName}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedDesignationName === 'SSM' && (
          <div className="col-span-2 mt-6">
            <h3 className="font-medium mb-2">Monthly Targets</h3>
            <div className="grid grid-cols-2 gap-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-center">
                  <div className="w-1/2">{field.month}</div>
                  <div className="w-1/2">
                    <input
                      type="number"
                      {...register(`targetQty.${index}.target`)}
                      className="w-full border px-3 py-2 rounded"
                    />
                    {errors.targetQty?.[index]?.target && (
                      <p className="text-red-500 text-xs">
                        {errors.targetQty[index].target.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="font-medium">Operating Area</label>
          <input {...register('operatingArea')} className="w-full border rounded px-3 py-2" />
        </div>

        {/* <div>
          <label className="font-medium">Discount %</label>
          <input {...register('discountPercent')} className="w-full border rounded px-3 py-2" />
        </div> */}

        {/* <div>
          <label className="font-medium">Coupon Code</label>
          <input {...register('discountCode')} className="w-full border rounded px-3 py-2" />
        </div> */}

        {/* Photo Upload */}
        <div className="col-span-2">
          <label className="font-medium">Upload Photo</label>
          <input type="file" id="photo-upload" accept="image/*" onChange={handleImageChange} />
          {currentPhotoToDisplay && (
            <div className="mt-2 relative w-fit">
              <img
                src={currentPhotoToDisplay}
                alt="preview"
                className="w-32 h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={handleClearPhoto}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <FaTimesCircle />
              </button>
            </div>
          )}
        </div>

        <div className="col-span-2">
          <button type="submit" className="bg-black text-yellow-400 px-6 py-2 rounded">
            {isEditMode ? 'Update Employee' : 'Onboard Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesTeamForm;
