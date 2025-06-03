import React, { useState } from 'react';
import { verifyOtp } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface OtpModalProps {
  payloadval: {
    email: string;
    password: string;
  };
  onClose: () => void;
}

export default function OtpModal({ payloadval, onClose }: OtpModalProps) {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const verifyOtps = async () => {
    const payload:any = {
      otp,
      email: payloadval.email,
      password: payloadval.password,
      role: 'Admin',
    };

    const response: any = await dispatch(verifyOtp(payload));
    const role = response?.payload?.role;

    if (role === 'SuperAdmin' || role === 'Admin') {
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          maxLength={6}
          placeholder="6-digit OTP"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-center"
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={verifyOtps}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Verify
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
