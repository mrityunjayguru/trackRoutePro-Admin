import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo/TrPro.png';
import login from '../../images/user/login.jpg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { adminLogin } from '../../api/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Footer } from '../../components/Footer/Footer';
// import './SignIn.css'; // Import CSS for loader styles

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    if (!email) {
      setError('Please enter a valid UserID.');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    const payload: any = { password: password.trim() };
    if (email.includes('@')) {
      payload.email = email.trim();
      payload.role = 'Admin';
    } else {
      payload.phone = email.trim();
      payload.role = 'Dealer';
    }
    setLoading(true); // Start loader
    try {
      const response: any = await dispatch(adminLogin(payload));
      setLoading(false);
      if (
        response.payload?.role === 'SuperAdmin' ||
        response.payload?.role === "Admin"
      ) {
        navigate('/');
      } else if (response.payload?.role === 'Dealer') {
        navigate('/DealearDashboard');
      }

    } catch (error) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-4xl rounded-lg overflow-hidden md:flex ">
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

              <form onSubmit={handleAdminLogin}>
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    User Id
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none w-full"
                      placeholder="Enter User Id"
                    />
                  </div>
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

                <div className="mb-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#000] text-yellow-400 cursor-pointer rounded-lg py-3 font-semibold transition hover:bg-opacity-90 ${
                      loading ? 'cursor-not-allowed opacity-100' : ''
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
                </div>

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