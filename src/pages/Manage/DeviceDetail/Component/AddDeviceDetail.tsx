import { useEffect, useRef, useState } from 'react';
import {
  createDeviceDetails,
  createDeviceDetailWithExcel,
} from '../../../../api/DeviceDetails';
import GlobalForm from '../../../../GlobalForm/GlobalForm';
import { AppDispatch } from '../../../../store/store';
import { AddDeviceDetailKey } from '../../../../Utility/FolmKeys/DeviceDetail/AddDeviceDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddDeviceDetail() {
  const navigate=useNavigate()
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye?.deviceType,
  );
const [disabled,setDesabled]=useState(false)
  // File selection state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle form submission for device details
  const handleSubmit = async(data: any) => {
    setDesabled(true)
   let {payload}:any= await dispatch(createDeviceDetails(data));
   if(payload){
    setDesabled(false)
    navigate("/manage-Inventory")
   }
   setDesabled(false)
  };

  // Trigger file input click when the button is clicked
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle the file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // UseEffect to trigger file processing when a file is selected
  useEffect(() => {
    const uploadFile = async () => {
      if (selectedFile) {
        const payload: any = {
          excel: selectedFile,
        };
        try {
          await dispatch(createDeviceDetailWithExcel(payload));
          navigate("/manage-Inventory");
          setSelectedFile(null); // Reset after dispatch
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };
  
    uploadFile();
  }, [selectedFile, dispatch, navigate]);
  

  return (
    <div className='my-10'>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xls,.xlsx,.csv"
        style={{ display: 'none' }} // Hide the file input
        onChange={handleFileChange}
      />
      <div className="flex gap-5">
        <button
          onClick={handleImageClick}
          className="w-[200px] bg-[#000000] text-[#D9E821] py-2 rounded-lg font-medium transition 1"
        >
          Upload Excel
        </button>
        <button className="w-[200px] text-[#000000] bg-[#D9E821] py-2 rounded-lg font-medium transition 1">
          <a href="/public/sampleexcel.csv" download="sample.csv">
            Download Sample
          </a>
        </button>
      </div>

      <div className="mt-2 px-5">
        <GlobalForm
          fields={AddDeviceDetailKey(devicetypeDetails)}
          handleSubmit={handleSubmit}
          buttontext="Save Device"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default AddDeviceDetail;
