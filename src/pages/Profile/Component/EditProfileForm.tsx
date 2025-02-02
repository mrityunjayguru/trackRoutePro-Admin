import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ImagePopup from '../../../common/ImagePopup';
import ChangePassword from './ChangePassword';
import ChangePasswordWithOtp from './ChangePasswordWithOtp';

interface EditProfileFormProps {
  userData: any; // Expecting userData to be a function passed as a prop
}

function EditProfileForm({ userData }: EditProfileFormProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const [profile, setProfile] = useState({
    name: loginUser?.Name,
    id: loginUser?.uniqueCode,
    dob: loginUser?.dob,
    email: loginUser?.emailAddress,
    mobile: loginUser?.idDocument,
    gender: loginUser?.gender,
    address: loginUser?.address,
    country: loginUser?.country,
    state: loginUser?.state,
    city: loginUser?.city,
    pinCode: loginUser?.pinCode,
    documentType: loginUser?.idDocument,
    documentId: loginUser?.idno,
    documentName: loginUser?.idDocument,
    password: '**********',
    status: 'Active',
  });

  useEffect(() => {
    if (loginUser) {
      setProfile({
        name: loginUser?.Name || '',
        id: loginUser?.uniqueCode || '',
        dob: loginUser?.dob || '',
        email: loginUser?.emailAddress || '',
        mobile: loginUser?.phone || '',
        gender: loginUser?.gender || '',
        address: loginUser?.address || '',
        country: loginUser?.country || '',
        state: loginUser?.state || '',
        city: loginUser?.city || '',
        pinCode: loginUser?.pinCode || '',
        documentType: loginUser?.idDocument || '',
        documentId: loginUser?.idno || '',
        documentName: loginUser?.idDocument || '',
        password: '**********',
        status: 'Active',
      });
    }
  }, [loginUser]);

  // Handle change for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const [selectedOption, setSelectedOption] = useState('Selected');
  const handleFuelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'All') {
      // Additional logic if needed
    }
  };

  const handlePreview = (url: any) => {
    if (url) {
      setImageSrc(url);
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    userData(profile);
  }, [profile]);

  // Check if the role is 'Admin' or 'SuperAdmin'
  const isEditable =
    loginUser?.role === 'Admin' || loginUser?.role === 'SuperAdmin';

  return (
    <>
      {isPopupOpen && <ImagePopup imageSrc={imageSrc} onClose={closePopup} />}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-[#D9E821] mb-4">General</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              label: 'Email ID / User ID',
              name: 'email',
              value: profile.email,
              editable: isEditable, // Only editable for Admin/SuperAdmin
            },
            {
              label: 'Mobile Number',
              name: 'mobile',
              value: profile.mobile,
              editable: isEditable, // Only editable for Admin/SuperAdmin
            },
            {
              label: 'Gender',
              name: 'gender',
              value: profile.gender,
              editable: isEditable, // Only editable for Admin/SuperAdmin
            },
            {
              label: 'Permanent Address',
              name: 'address',
              value: profile.address,
              editable: isEditable, // Only editable for Admin/SuperAdmin
            },
            {
              label: 'Country',
              name: 'country',
              value: profile.country,
              editable: false, // Only editable for Admin/SuperAdmin
            },
            {
              label: 'State',
              name: 'state',
              value: profile.state,
              editable: true, // Always editable for everyone
            },
            {
              label: 'City',
              name: 'city',
              value: profile.city,
              editable: true, // Always editable for everyone
            },
            {
              label: 'Pin Code',
              name: 'pinCode',
              value: profile.pinCode,
              editable: true, // Always editable for everyone
            },
          ].map((field, index) => (
            <div
              key={index}
              className={`${field.name === 'address' ? 'col-span-2 ' : ''}`}
            >
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  className={`${field.name === 'address' ? '' : ''} ${
                    !field.editable ? 'cursor-not-allowed' : ''
                  } w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-[#D9E821] mb-4">Document</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Identity Document
            </label>
            <input
              type="text"
              name="documentType"
              value={profile.documentType}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              ID Number
            </label>
            <input
              type="text"
              name="documentId"
              value={profile.documentId}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Upload Document
            </label>
            <div className="flex items-center mt-1">
              <button
                onClick={() => handlePreview(loginUser.Document)}
                className="px-4 py-2 text-sm font-medium text-[#000000] bg-[#D9E821] rounded"
              >
                Preview
              </button>
              <span className="ml-4 text-sm text-gray-600">
                {profile.documentName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div></div>
      <div>
        <h3 className="text-lg font-medium text-[#D9E821] mb-4">
          Change Password
        </h3>
        <div className="mb-2 w-1/2">
          <div className="flex RadioCustome">
            <label className="cursor-pointer">
              <span className="ml-2 text-sm">with Old Password</span>
              <input
                type="radio"
                name="Selected"
                value="Selected"
                onChange={handleFuelChange}
                checked={selectedOption === 'Selected'}
                className="cursor-pointer setbluebutton ml-4"
              />
            </label>
            <label className="ml-6 cursor-pointer">
              <span className="ml-2 text-sm">OTP with Mail</span>
              <input
                type="radio"
                name="All"
                value="All"
                onChange={handleFuelChange}
                checked={selectedOption === 'All'}
                className="cursor-pointer text-sm setbluebutton ml-4"
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 my-1">
          {selectedOption === 'All' ? (
            <ChangePassword />
          ) : (
            <ChangePasswordWithOtp />
          )}
        </div>
      </div>
    </>
  );
}
export default EditProfileForm;
