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
      emailAddress:loginUser.emailAddress
    };

    // Dispatch action to reset password
   let responce= await dispatch(ResetPasswordWithOldPassword(payload));
   if(responce.payload){
        navigate("/auth/signin")
   }
  };

  return (
    <>
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
          className="px-14 py-2 my-1 text-[#D9E821] bg-[#000000] font-medium text-[14px]"
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default ChangePasswordWithOtp;
