import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetpassword, sendOtp } from '../../../api/auth';
import { AppDispatch } from '../../../store/store';

function ChangePassword() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // state for OTP
  const [password, setPassword] = useState(''); // state for password
  const [confirmpassword, setConfirmPassword] = useState(''); // state for confirm password
  const [status, setStatus] = useState(false); // status to check if OTP was sent
  const [error, setError] = useState(''); // error message

  const handleClick = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setError(''); // Reset any previous errors

    const payload: any = {
      emailAddress: email, // use email directly from state
      _id: loginUser._id,
    };
    
    let response: any = await dispatch(sendOtp(payload));
    if (response.payload) {
      setStatus(true); // set status to true when OTP is sent
    } else {
      setError('Failed to send OTP. Please try again');
    }
  };

  const handleReset = async () => {
    if (password !== confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    const payload: any = {
      password: password,
      emailAddress: email,
      _id:loginUser._id,
      otp: otp,
    };

    let response: any = await dispatch(resetpassword(payload));
    if (response.payload) {
      setError('');
  
      // Optionally, redirect user to login or another page
    } else {
      setError('Failed to reset password. Please try again');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-5 bg-white p-8 rounded-lg shadow-lg">

      {!status ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-600">Enter Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
              placeholder="Enter Email Address"
            />
            <button
              onClick={handleClick}
              className="w-[200px] bg-[#000000] mt-2 text-[#D9E821] py-2 rounded-lg font-medium transition "
            >
              Send OTP
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
              placeholder="Enter OTP"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">Enter New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
              placeholder="Enter New Password"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">Confirm New Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
              placeholder="Confirm New Password"
            />
          </div>

          <button
            onClick={handleReset}
            className="w-[200px] bg-[#000000] mt-2 text-[#D9E821] py-2 rounded-lg font-medium transition "
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default ChangePassword;
