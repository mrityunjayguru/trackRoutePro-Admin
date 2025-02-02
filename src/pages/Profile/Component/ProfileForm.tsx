import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ImagePopup from '../../../common/ImagePopup';
function ProfileForm() {
     const [isPopupOpen, setIsPopupOpen] = useState(false);
     const [imageSrc, setImageSrc] = useState('');
     const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
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
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
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
  return (
    <>
      {isPopupOpen && <ImagePopup imageSrc={imageSrc} onClose={closePopup} />}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#D9E821] mb-4">General</h3>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Email ID / User ID', name: 'email', value: profile.email, readOnly: true },
              { label: 'Mobile Number', name: 'mobile', value: profile.mobile, readOnly: true },
              { label: 'Gender', name: 'gender', value: profile.gender, readOnly: true },
              { label: 'Permanent Address', name: 'address', value: profile.address, readOnly: true },
              { label: 'Country', name: 'country', value: profile.country, readOnly: true },
              { label: 'State', name: 'state', value: profile.state, readOnly: true },
              { label: 'City', name: 'city', value: profile.city, readOnly: true },
              { label: 'Pin Code', name: 'pinCode', value: profile.pinCode, readOnly: true },
            ].map((field, index) => (
              <div key={index} className={`${
                field.name === 'address' ? 'col-span-2 ' : ''
              }`}  >
               <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  readOnly={field.readOnly}
                  className={`${
                    field.name === 'address' ? 'grid grid-cols-2' : ''
                  } ${
                    field.readOnly ? 'cursor-not-allowed' : ''
                  } w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1`}
                />
                </div>
            ))}
          </div>
        </div>

        {/* Document Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#D9E821] mb-4">Document</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Identity Document</label>
              <input
                type="text"
                name="documentType"
                value={profile.documentType}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">ID Number</label>
              <input
                type="text"
                name="documentId"
                value={profile.documentId}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none my-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Upload Document</label>
              <div className="flex items-center mt-1">
                <button onClick={()=>handlePreview(loginUser.Document)} className="px-4 py-2 text-sm font-medium text-[#000000] bg-[#D9E821] rounded">
                  Preview
                </button>
                <span className="ml-4 text-sm text-gray-600">{profile.documentName}</span>
              </div>
            </div>
          </div>
        </div>

      <div>
    
      </div>
       
    </>
  )
}

export default ProfileForm
