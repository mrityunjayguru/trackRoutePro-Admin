import React, { useState, useEffect } from 'react';
import { addMaintenance, createsetting, getMaintenance } from '../../../../api/setting';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import CommonHeader from '../../../../common/CommonHeader';

interface TextProps {
  text: string;
  data: any;
}

function HandleSetting({ text, data }: TextProps) {
  const [status, setStatus] = useState('Active');
  const [selectedDate, setSelectedDate] = useState('');
  const [duration, setDuration] = useState('');
  const [durationTime, setDurationTime] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<{ date?: string }>({});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) {
      setStatus(data.status || 'Active');
      setSelectedDate(data.date?.split('T')[0] || '');

      if (data.duration) {
        const [datePart, timePart] = data.duration.split('T');
        setDuration(datePart || '');
        setDurationTime(timePart ? timePart.substring(0, 5) : ''); // hh:mm
      }

      setIsActive(data.isActive ?? true);
    }
  }, [data]);

  const validateForm = () => {
    return true
    let isValid = true;
    const validationErrors: { date?: string } = {};

    if (!selectedDate) {
      validationErrors.date = 'Date is required.';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleToggleStatus = () => {
    setIsActive((prev) => !prev);
  };

  const handleToggleIsActive = () => {
    setIsActive((prev) => !prev);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const isoDuration = duration && durationTime
        ? `${duration}T${durationTime}:00`
        : '';

      const formData = {
        status,
        date: selectedDate,
        duration: isoDuration,
        isActive,
        someField: data?.someField || '',
      };

      const payload = data && data._id ? { ...formData, _id: data._id } : formData;
     await dispatch(addMaintenance(payload));
        await  dispatch(getMaintenance({ someField: '' })); // Provide a valid value for someField
      
    }
  };

  const propsData = { title: text };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-20 grid-cols-2 my-4">
        <div>
          <CommonHeader propsData={propsData} />

          <div className="grid grid-cols-1 gap-6 bg-[#fff] py-5 px-5 my-5 sm:grid-cols-1">
            {/* Status Toggle */}
            <div className="mb-2 flex items-center">
              <label className="w-1/3 text-[14px] font-normal text-[#000] mr-4">Activate:</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={handleToggleStatus}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#D9E821] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#000]" />
              </label>
            </div>

           

            {/* Duration Date */}
            <div className="mb-2 flex">
              <label className="w-1/3 text-[14px] font-normal text-[#000]">Duration Date</label>
              <input
                type="date"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              />
            </div>

            {/* Duration Time */}
            <div className="mb-2 flex">
              <label className="w-1/3 text-[14px] font-normal text-[#000]">Duration Time</label>
              <input
                type="time"
                value={durationTime}
                onChange={(e) => setDurationTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-2 flex items-center justify-center">
              <button
                type="submit"
                className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-[#D9E821] font-normal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default HandleSetting;
