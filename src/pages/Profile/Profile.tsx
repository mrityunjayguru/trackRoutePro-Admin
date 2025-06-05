import React, { useRef, useState } from 'react';
import ProfileForm from './Component/ProfileForm';
import EditProfileForm from './Component/EditProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToDDMMMYYYY, formatDateToDDMMMYYYYwithTime } from '../../common/ManageDate';
import { updateProfile, updateUserDetails } from '../../api/auth';
import { AppDispatch } from '../../store/store';
import { editSubscriber } from '../../api/users';

const Profile = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch=useDispatch<AppDispatch>()
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
const [userecord,setUserRecord]=useState<any>(null)
  console.log(loginUser,"loginUserloginUser")
  const [profile, setProfile] = useState({
    name:loginUser?.Name,
    id: loginUser?.uniqueCode,
    dob: loginUser?.dob,
    email: loginUser?.emailAddress,
    mobile:loginUser?.phone,
    gender:loginUser?.gender,
    address:loginUser?.address,
    country:loginUser?.country,
    state:loginUser?.state,
    city:loginUser?.city,
    pinCode:loginUser?.pinCode,
    documentType:loginUser?.idDocument,
    documentId:loginUser?.idno,
    documentName:loginUser?.idDocument,
    password: '**********',
    status: 'Active',
  });
  const [toggle,detToggle]=useState(false)
  const handleEditProfileSubmit=async()=>{
    detToggle(false)
    const payload:any={
      state:userecord?.state,
      city:userecord?.city,
      pinCode:userecord?.pinCode,
      address:userecord?.address,
      _id:loginUser._id
    }
   await dispatch(updateUserDetails(payload));
  }
  const handleEditProfile=async()=>{
    detToggle(!toggle)
  }
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const payload:any={
        profile:file,
        _id:loginUser?._id
      }
      dispatch(updateProfile(payload))
    };
    const handleImageClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const handleSubmit=async (data:any)=>{
      setUserRecord(data)
    }
  return (
    <div className="">
         <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.jpe"
        style={{ display: 'none' }} // Hide the file input
        onChange={handleFileChange}
      />
      <div className=" bg-white  rounded-lg ">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div className='flex gap-20'>
          <div className="flex items-center gap-4">
            <div className='w-20 h-20 '>
            <img onClick={handleImageClick} className='h-full border rounded-full w-full object-cover' src={`${import.meta.env.VITE_APP_Image_Url}${loginUser?.profile}`} alt="User" />
            </div>
           
            <div>
              <p className="text-sm text-gray-600">{profile.id}</p>
              <h2 className="text-xl font-semibold text-gray-800">
                {loginUser?.Name}
              </h2>
              <p className="text-sm text-gray-600">DOB: {formatDateToDDMMMYYYY(loginUser?.dob)}</p>
            </div>
          </div>
          <div>
            <p>Last Update: {formatDateToDDMMMYYYYwithTime(loginUser.updatedAt)}</p>
             <span className="inline-block px-4 py-2 my-3 text-sm font-medium text-[#000000] bg-[#D9E821] rounded-full">
              {profile.status}
            </span>
            </div>
          </div>
          <div>
           {toggle?( <button onClick={handleEditProfileSubmit} className="ml-4 px-6 py-2 text-sm font-medium text-[#D9E821] bg-[#000000] rounded ">
             Submit
            </button>):( <button onClick={handleEditProfile} className="ml-4 px-6 py-2 text-sm font-medium text-[#D9E821] bg-[#000000] rounded ">
              Edit Profile
            </button>)}
          </div>
        </div>
        {toggle?(<EditProfileForm userData={handleSubmit} />):(<ProfileForm />)}
      </div>
    </div>
  );
};

export default Profile;
