import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo/TrPro.png'; // Make sure this path is correct
import login from '../../images/user/login.jpg'; // Make sure this path is correct
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { adminLogin, salesTeamLogin } from '../../api/auth'; // Assuming this API handles both admin and dealer logins
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Footer } from '../../components/Footer/Footer';
import { getDeviceInfo } from '../../common/getDeviceInfo';
import OtpModal from './OtpModal';

type LoginType = 'admin' | 'salesTeam';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [payloadVal, setPayloadVal] = useState<any>(null);
  const [loginType, setLoginType] = useState<LoginType>('admin'); // New state for login type

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    if (!email.trim()) {
      setError(`Please enter a valid UserID for ${loginType === 'admin' ? 'Admin' : 'Sales Team'}.`);
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }
    try {

if(loginType=="admin"){
    const payload: any = {
      password: password.trim(),
      deviceInfo: getDeviceInfo(),
    };

    if (email.includes('@')) {
      payload.email = email.trim();
      payload.role="Admin"
    } else {
      payload.phone = email.trim();
      payload.role="Dealer"

    }

    setPayloadVal(payload);
    setLoading(true);

      const response: any = await dispatch(adminLogin(payload)); // Using adminLogin for both roles
      const role = response.payload?.role;
      setLoading(false);

      if (role === 'SuperAdmin') {
        setShowModal(true); // Show OTP modal for SuperAdmin
      } else if (role === 'Admin') {
        navigate('/');
      } else if (role === 'Dealer') { // Navigate for Dealer (Sales Team)
        navigate('/DealearDashboard');
      } else {
        setError('Invalid credentials or role');
      }
}else{
const payload:any={
   password: password.trim(),
    email:email
}
let response:any=await dispatch(salesTeamLogin(payload))
if(response.payload){
 navigate('/salesApp/sales-team');
}

}

    } catch (err) {
      console.error("Login API error:", err); // Log the full error for debugging
      setError('Login failed. Please check your credentials and try again.');
      setLoading(false);
    }
  };

  const handleRadioChange = (type: LoginType) => {
    setLoginType(type);
    // Reset fields and errors when switching login type
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <>
      {showModal && (
        <OtpModal
          payloadval={payloadVal}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-4xl rounded-lg overflow-hidden md:flex">
            <div className="w-full md:w-1/2 p-8">
              <div className="flex justify-center mb-6 bg-[#000] rounded-md">
                <img
                  className="w-[300px] h-40 object-contain"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                Login Into Your Account
              </h2>

              {/* Radio Button Selection */}
              <div className="mb-6 flex justify-center gap-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#D9E821] h-5 w-5"
                    name="loginType"
                    value="admin"
                    checked={loginType === 'admin'}
                    onChange={() => handleRadioChange('admin')}
                  />
                  <span className="ml-2 text-gray-700 font-semibold">Login as Admin</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#D9E821] h-5 w-5"
                    name="loginType"
                    value="salesTeam"
                    checked={loginType === 'salesTeam'}
                    onChange={() => handleRadioChange('salesTeam')}
                  />
                  <span className="ml-2 text-gray-700 font-semibold">Login as Sales Team</span>
                </label>
              </div>

              <form onSubmit={handleLogin}> {/* Changed to handleLogin */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    User Id ({loginType === 'admin' ? 'Email/Phone' : 'Phone'})
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none w-full"
                    placeholder={`Enter ${loginType === 'admin' ? 'Admin' : 'Sales Team'} User Id`}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none w-full"
                      placeholder="Enter your password"
                    />
                    <span
                      className="absolute right-4 top-3 cursor-pointer text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#000] text-yellow-400 cursor-pointer rounded-lg py-3 font-semibold transition hover:bg-opacity-90 ${
                    loading ? 'cursor-not-allowed opacity-100' : '' // Keep original opacity during loading
                  }`}
                >
                  {loading ? (
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-[#fff]">Logging in</span>
                      <div className="flex">
                        <span className="dot-loader"></span>
                        <span className="dot-loader"></span>
                        <span className="dot-loader"></span>
                      </div>
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Forgot Password?
                    <Link to="#" className="text-primary font-semibold ml-1">
                      Click here to reset
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            <div className="md:block w-full h-full md:w-1/2 overflow-hidden">
              <img
                className="mt-[30px] w-[677px] h-[514px] object-cover rounded-md"
                src={login}
                alt="Login Illustration"
              />
            </div>
          </div>
        </div>

        <div className="w-[65%] mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SignIn;