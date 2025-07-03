import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { validateForm } from '../Utility/validateForm';
import { LuUpload } from 'react-icons/lu';
import '../css/global.css';
import { HandleFormData, setBlankArray, storeFormData } from '../api/Device';
import ImagePopup from '../common/ImagePopup';
interface GlobalFormProps {
  fields: any;
  handleSubmit: (formData: { [key: string]: any }) => void;
  buttontext: string;
  disabled:boolean
}
const GlobalForm: React.FC<GlobalFormProps> = ({
  fields,
  handleSubmit,
  buttontext,
  disabled
  
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const globalFormData = useSelector(
    (state: any) => state.subscriber.globalFormData,
  );
  const formData = useSelector((state: any) => state.subscriber?.formData);
  const [errors, setErrors] = useState<any>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [filename, setFilenames] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const fetchData = async () => {
      if (fields?.length > 0) {
        try {
          await dispatch(HandleFormData(fields)); // Assuming HandleFormData supports async
        } catch (error) {
          console.error("Error dispatching form data:", error);
        }
      }
    };
    fetchData(); // Call the async function
    return () => {
      let val: any = [];
      dispatch(setBlankArray(val)); // Clear form data when unmounting
    };
  }, []);

  useEffect(() => {
    const fieldMap = globalFormData?.reduce(
      (acc: any, field: { name: string; value: any }) => {
        if (field.name) {
          acc[field.name] = field.value || ''; // Initialize field values
        }
        return acc;
      },
      {},
    );
    dispatch(storeFormData(fieldMap)); // Set initial state in Redux
  }, [globalFormData, dispatch]);



const handleChange = (e: any) => {
  const { name, type, files, value, checked } = e.target;
  const updatedValue =
    type === 'file' ? files : type === 'checkbox' ? checked : value;

  if (type === 'file' && files[0]) {
    setFilenames(prev => ({
      ...prev,
      [name]: files[0].name,
    }));
  }

  const updatedFormData = {
    ...formData,
    [name]: type === 'file' ? files[0] : updatedValue,
  };
  dispatch(storeFormData(updatedFormData));
  const validationErrors = validateForm(updatedFormData);
  setErrors(validationErrors);
};


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const updatedValues = checked
      ? [...(formData[name] || []), value]
      : (formData[name] || []).filter((val: string) => val !== value);
    const updatedFormData = { ...formData, [name]: updatedValues };
    dispatch(storeFormData(updatedFormData));
    const validationErrors = validateForm(updatedFormData);
    setErrors(validationErrors);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
    } else {
      setErrors({}); // Reset errors if form is valid
      handleSubmit(formData); // Proceed to submit the form
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const handlePreview = (url: any) => {
    console.log(url, "url");
    if (url) {
      setImageSrc(url);
      setIsPopupOpen(true);
    }
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      {isPopupOpen && <ImagePopup imageSrc={imageSrc} onClose={closePopup} />}
      <div className="gap-4 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 globalform">
        {formData && fields?.map((field: any, index: any) => (
          <div
            key={index}
            className={`relative py-1  ${
              field.type === 'checkboxGroup' ? 'col-span-3' : ''
            }`}
          >
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <div
              className={`mt-1 relative ${
                field.type === 'radioGroup' ? 'flex gap-5' : ''
              }`}
            >
              {field.type === 'select' && field.options ? (
                <select
                  id={field.name}
                  disabled={field?.disabled}
                  name={field.name}
                  value={formData[field?.name] || ''}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none ${
                    errors[field.name] ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">{field.placeholder}</option>
                  {field?.options?.map((option: any, idx: any) => (
                    <option
                      key={idx}
                      value={typeof option === 'string' ? option : option.value}
                    >
                      <img
                        src={`${
                          import.meta.env.VITE_APP_Image_Url
                        }${option?.icon}`}
                        alt="icon"
                      />{' '}
                      {typeof option === 'string' ? option : option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'radioGroup' && field.options ? (
                field?.options?.map((option: any, idx: any) => (
                  <div key={idx} className="flex items-center">
                    <input
                      type="radio"
                      id={option.value}
                      name={field.name}
                      disabled={field?.disabled}
                      value={option.value}
                      checked={formData[field.name] === option.value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor={option.value} className="text-sm">
                      {option.label}
                    </label>
                  </div>
                ))
              ) : field.type === 'checkboxGroup' && field.options ? (
                <div className=" sm:grid sm:grid-cols-2 md:grid-cols-3 ">
                  {field?.options?.map((option: any, idx: any) => (
                    <div key={idx} className="flex gap-2 py-2  cursor-pointer">
                      <input
                        type="checkbox"
                        id={option.value}
                        name={field.name}
                        value={option.value}
                      disabled={field?.disabled}

                        checked={
                          Array.isArray(formData[field.name]) &&
                          formData[field.name].includes(option.value)
                        }
                        onChange={handleCheckboxChange}
                        className="mr-2 "
                      />
                      <label htmlFor={option.value} className="text-sm">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              ) : field.type === 'file' ? (
                <>
                 <div className="flex gap-2 items-center">
  <label
    htmlFor={`fileInput_${field.name}`}
    className="flex justify-center items-center gap-2 custom-file-button text-center text-sm text-[#000]"
  >
    <LuUpload />
    Upload
  </label>
  <p className="text-sm #9F9EA2">
    {filename[field.name] ? filename[field.name] : 'No File Chosen'}
  </p>
</div>
<input
  type="file"
  id={`fileInput_${field.name}`}
  name={field.name}
  onChange={handleChange}
  disabled={field?.disabled}
  className="hidden"
/>

                </>
              ) : field.type === 'view' ? (
                <button className='bg-[#D9E821] px-7 py-2 text-[#000000]'
                  type="button"
                  onClick={() => handlePreview(field?.value)}
                >
                  Preview
                </button>
              ) : (
                <input
                  type={
                    field.name === 'password'
                      ? passwordVisible
                        ? 'text'
                        : 'password'
                      : field.type
                  }
                  id={field.name}
                  name={field.name}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none ${
                    errors[field.name] ? 'border-red-500' : ''
                  }`}
                  placeholder={field.placeholder}
                  value={formData[field?.name] || ''}
                  onChange={handleChange}
                  disabled={field?.disabled}
                />
              )}

              {field.name === 'password' && (
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEye size={20} color="#5E5E5E" />
                  ) : (
                    <FaEyeSlash size={20} color="#5E5E5E" />
                  )}
                </span>
              )}
            </div>

            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>
      {buttontext && (
  <button
    onClick={handleFormSubmit}
    type="submit"
    disabled={disabled}
    className={`w-[200px] bg-[#000000] mt-10 text-[#D9E821] py-2 rounded-lg font-medium transition 
      ${disabled ? 'cursor-not-allowed opacity-100' : 'cursor-pointer'}
    `}
  >
    {disabled ? (
      <div className="flex justify-center items-center gap-2">
        {/* Loader */}
        <div className="flex">
          <span className="w-4 h-4 rounded-full bg-[#fff] animate-bounce delay-100"></span>
          <span className="w-4 h-4 rounded-full bg-[#fff] animate-bounce delay-200 ml-1"></span>
          <span className="w-4 h-4 rounded-full bg-[#fff] animate-bounce delay-300 ml-1"></span>
        </div>
        <span className='text-[#fff]'>Processing...</span>
      </div>
    ) : (
      buttontext
    )}
  </button>
)}
    </>
  );
};

export default GlobalForm;
