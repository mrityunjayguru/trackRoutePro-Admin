import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { addSlesAppNotification, getSalesAppnotification } from '../../../../api/salesApp/Notification';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  notificationTitle: Yup.string().required('Title is required'),
  message: Yup.string().required('Message is required'),
});

const NotificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const dispatch=useDispatch<AppDispatch>()

  const onSubmit =async(data: any) => {
    console.log(data);
    await dispatch(getSalesAppnotification(data))
    reset(); // Clear form
  };



  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Send Team Notifications</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Select User (for now as a text input; can be replaced with select dropdown) */}
       

        {/* Notification Title */}
        <div className="mb-5">
          <label htmlFor="notificationTitle" className="block text-sm font-medium text-gray-700 mb-2">
            Notification Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="notificationTitle"
            {...register('notificationTitle')}
            className={`w-full px-4 py-2 border ${errors.notificationTitle ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="Enter title"
          />
          {errors.notificationTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.notificationTitle.message}</p>
          )}
        </div>

        {/* Message Textarea */}
        <div className="mb-5">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="Enter your message"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-150 ease-in-out shadow-lg"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;
