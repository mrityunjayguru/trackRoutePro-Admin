import { useState, useEffect } from 'react';
import { AddNewAdmin, updateAdmin } from '../../../api/Admin'; // Assume UpdateAdmin is defined
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { Permission } from '../../../layout/Permision';
import { decrypt } from '../../../common/Encription';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DocumentPopup from '../../ManageUsers/Component/Subscriber/DocumentPopup';
import Breadcrumb from '../../../common/Breadcrumb';
import Admincheckbox from './Admincheckbox';
import Moderate from './Moderate';
import Operator from './Operator';
import EditAdminCheckbox from './EditAdminCheckbox';
import EditModerateCheckbox from './EditModerateCheckbox';
import EditOperator from './EditOperator';
const EditAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const singleadmin = useSelector((state: any) => state.adminRole.singleAdmin);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const [editPermission, setEditPermission] = useState<any>({});
  useEffect(() => {
    if (
      loginUser.permissions?.Admin?.Update == true ||
      loginUser.role != 'SuperAdmin'
    ) {
      navigate('/');
    }
  }, []);
  // Initial state for the form fields
  const initialFormData = {
    fullName: '',
    phoneNumber: '',
    emailAddress:"",
    status: 'Active',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [permissions, setPermissions] = useState<any>({});
  const [profile, setprofile] = useState<any>(null);

  // State for validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress:"",
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (singleadmin) {
        // Decrypt password asynchronously
        let newpassword = await decrypt(singleadmin.password);
        setprofile(singleadmin.profile)
        // Update the form data
        setSelectedRole(singleadmin?.AdminType)
        setFormData({
          fullName: singleadmin.Name || '',
          phoneNumber: singleadmin.phone || '',
          status: singleadmin.status ? 'Active' : 'Inactive',
          confirmPassword: newpassword,
          emailAddress:singleadmin.emailAddress
        });

        // Set permissions
        setPermissions(singleadmin.permissions);
      }
    };

    fetchAndSetData(); // Call the async function
  }, [singleadmin]);

  // Validation function
  const validateForm = () => {
    const { fullName, phoneNumber, confirmPassword,emailAddress } = formData;
    let valid = true;
    const newErrors = { fullName: '', phoneNumber: '', confirmPassword ,emailAddress:""};

    // Check if each field meets the requirements
    if (fullName.length < 4) {
      newErrors.fullName = 'Full Name must be at least 4 characters long';
      valid = false;
    }
    if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits';
      valid = false;
    }
    if (confirmPassword == '') {
      newErrors.phoneNumber = 'Password is require';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const resetFormData = () => {
    setFormData(initialFormData); // Reset form data to initial state
    setErrors({ fullName: '', phoneNumber: '', confirmPassword: '' ,emailAddress:""}); // Reset errors
  };
  const navigate = useNavigate();
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    if (validateForm()) {
      const payload: any = {
        Name: formData.fullName,
        phone: formData.phoneNumber,
        status: formData.status === 'Active' ? true : false,
        permissions: permissions,
        profile:file,
        AdminType:selectedRole,
        emailAddress:formData.emailAddress,
        password:formData.confirmPassword
      };

      if (singleadmin) {
        // If editing, update the admin
        await dispatch(updateAdmin({ ...payload, _id: singleadmin._id }));
        navigate('/account-management/manage-admin');
      } else {
        // If adding, create a new admin
        const uniqueNumber = [
          ...new Set(
            Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)),
          ),
        ].join('');
        payload.uniqueID = `Admin${uniqueNumber}`;
      await  dispatch(AddNewAdmin(payload));
        navigate('/account-management/manage-admin');
      }
      resetFormData(); // Reset form after submission
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error message for the respective field if input is valid
    if (name === 'fullName' && value.length >= 4) {
      setErrors((prevErrors) => ({ ...prevErrors, fullName: '' }));
    }
    if (name === 'phoneNumber' && value.length === 10) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    let split: string[] = name.split('-');

    let updatedPermissions = JSON.parse(JSON.stringify(permissions));

    if (checked) {
      if (!updatedPermissions[split[0]]) {
        updatedPermissions[split[0]] = {};
      }
      updatedPermissions[split[0]][split[1]] = true;
    } else {
      if (updatedPermissions[split[0]]) {
        updatedPermissions[split[0]][split[1]] = false;
      }
    }
    setPermissions(updatedPermissions);
  };
  const getCheckedPermission = (category: any, permissionType: any) => {
    return permissions[category]?.[permissionType] || false;
  };
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };

  const [preivew,setPreivew]=useState<any>(null)
  const [file,setfile]=useState(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file:any = e.target.files?.[0] || null;
    setprofile(null);
    setfile(file)
    setPreivew(URL.createObjectURL(file))
  };
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const [isPopupOpen,setisPopupOpen]=useState(false)
  const [imageUrl,setimageUrl]=useState("")
  const closePopup=()=>{
    setisPopupOpen(false)
  }
  const handleopenimage=()=>{
    setisPopupOpen(true)
    setimageUrl(singleadmin.profile)
  }
  return (
    <>
         {isPopupOpen && <DocumentPopup imageSrc={imageUrl} onClose={closePopup} />}
         <div className="w-full">
      <div className="rounded-xl py-2 w-full flex items-center gap-28 px-3">
        <div>
          <h1 className="text-[#000] font-semibold text-xl">
<Breadcrumb/>
       
          </h1>
        </div>
      </div>
      <div className="my-5 ">
        <form className="my-10" onSubmit={handleSubmit}>
          <div className="px-4 py-2 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Full Name Field */}
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              />
              {errors.fullName && (
                <p className="text-red-500 text-[12px]">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Mobile"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-[12px]">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">
                email
              </label>
              <input
                type="text"
                name="emailAddress"
                placeholder="Enter Mobile"
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              />
              {errors.emailAddress && (
                <p className="text-red-500 text-[12px]">{errors.emailAddress}</p>
              )}
            </div>
            {/* Status Field */}
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-2 relative">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="**********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white"
                  aria-label={
                    isPasswordVisible ? 'Hide password' : 'Show password'
                  }
                >
                  {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-[12px]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            
            <div className="mb-2">
              <label className="mb-1 block text-black text-sm font-medium dark:text-white">
                Upload Profile
              </label>
              <input
                type="file"
                name="profile"
                placeholder="**********"
                onChange={handleFileChange}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
              />
              {/* {errors.profile && <p className="text-red-500 text-[12px]">{errors.profile}</p>} */}
            </div>
            <div className="flex gap-5 w-full">
    <div className="checkbox flex gap-5 w-full globalform items-center">
      <div className="flex justify-center items-center gap-2">
        <label htmlFor="admin">Admin</label>
        <input
          type="radio"
          id="admin"
          name="role"
          value="Admin"
          checked={selectedRole === "Admin"}
          onChange={handleRoleChange}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <label htmlFor="moderator">Moderator</label>
        <input
          type="radio"
          id="moderator"
          name="role"
          value="Moderator"
          checked={selectedRole === "Moderator"}
          onChange={handleRoleChange}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <label htmlFor="operator">Operator</label>
        <input
          type="radio"
          id="operator"
          name="role"
          value="Operator"
          checked={selectedRole === "Operator"}
          onChange={handleRoleChange}
        />
      </div>
    </div>
  </div>

 <div onClick={handleopenimage} className="mb-2 mt-auto py-4 cursor-pointer text-[#02B754] ">
 <FaEye style={{ fontSize: '24px' }} />
  </div>
</div>
  {selectedRole==="Admin"?(
  <>
  <EditAdminCheckbox permissions={permissions} setPermissions={setPermissions} userPermissionHave={selectedRole==singleadmin?.AdminType?singleadmin?.permissions:null}/></>
):(null)}
{selectedRole==="Moderator"?(
  <><EditModerateCheckbox permissions={permissions} setPermissions={setPermissions} userPermissionHave={selectedRole==singleadmin?.AdminType?singleadmin?.permissions:null} />
 </>
):(null)}
{selectedRole==="Operator"?(
  <>
   <EditOperator permissions={permissions} setPermissions={setPermissions} userPermissionHave={selectedRole==singleadmin?.AdminType?singleadmin?.permissions:null}/>
  </>
):(null)}
          {/* Permissions */}
          <div className="px-4 py-2 grid grid-cols-1 gap-6 sm:grid-cols-1">
          
            {/* Submit Button */}
            <div className="mb-2 flex gap-2">
              <button
                type="submit"
                className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-[#D9E821] font-medium "
              >
                Submit
              </button>
              <button onClick={()=>navigate("/account-management/manage-admin")}
                type="button"
                className="h-[40px] py-1 px-5 w-[200px] rounded-2xl bg-[#000] text-red-500 font-medium "
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
    
  );
};
export default EditAdmin;
