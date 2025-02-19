import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordWithOldPassword } from "../../../api/auth";
import { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";

function ChangePasswordWithOtp() {
  // Initialize state for passwords
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const navigate=useNavigate()
  // Handle change for each input field
  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission (reset password)
  const handleClick = async() => {
    // Simple validation check
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Construct payload and dispatch the action
    const payload :any= {
      password:oldPassword,
      newpassword:newPassword,
      emailAddress:loginUser.emailAddress,
      _id:loginUser._id
    };

    // Dispatch action to reset password
   let responce= await dispatch(ResetPasswordWithOldPassword(payload));
   if(responce.payload){
        navigate("/auth/signin")
   }
  };

  return (
    <>
  <div className="grid grid-cols-3 gap-5 bg-white p-8 rounded-lg shadow-lg">
  <div>
        <label className="block text-sm font-medium text-gray-600">Enter Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
          placeholder="Enter Old Password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Enter New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
          placeholder="Enter New Password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
          placeholder="Confirm New Password"
        />
      </div>

      <div className="mt-auto">
        <button
          onClick={handleClick}
          className="w-[200px] bg-[#000000] mt-2 text-[#D9E821] py-2 rounded-lg font-medium transition "
        >
          Reset
        </button>
      </div>
  </div>
    </>
  );
}

export default ChangePasswordWithOtp;
