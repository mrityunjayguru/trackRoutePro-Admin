import  { useEffect, useState } from 'react';
import {
  createPrivacyPolicy,
  getPrivacyPolicy,
  updatePrivacyandPolicy, // Import the update function
} from '../../../../api/PrivacyPolicy';
import { AppDispatch } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

function ManagePrivacy() {
  const dispatch = useDispatch<AppDispatch>();
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const records = useSelector((state: any) => state.PrivacyAndPolicy.AllprivacyandPolicy);

  // Fetch the existing privacy policy records
  const getRecords = () => {
    const payload: any = {};
    dispatch(getPrivacyPolicy(payload));
  };

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    if(records){
      if (records.length > 0) {
        // If records exist, populate the description with the existing record's description
        setDescription(records[0].description || ''); // Ensure to handle cases where description might be undefined
      }
    }
  
  }, [records]); // Run this effect whenever records change

  const validateDescription = (desc: string) => {
    if (!desc || desc.trim().length < 10) {
      setError('Description must be at least 10 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  const submitRecord = () => {
    if (validateDescription(description)) {
      const payload: any = { description };

      if (records.length > 0) {
        // If records exist, update the existing privacy policy
        const recordId = records[0]._id; // Assuming the record has an id field
        dispatch(updatePrivacyandPolicy({ _id: recordId, ...payload }))
          .then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              getRecords()
              console.log('Privacy policy updated successfully');
              setDescription(''); // Clear the textarea on successful update
            } else {
              console.error('Failed to update privacy policy');
            }
          })
          .catch((err) => {
            console.error('Error dispatching action:', err);
          });
      } else {
        // If no records exist, create a new privacy policy
        dispatch(createPrivacyPolicy(payload))
          .then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              getRecords()
              console.log('Privacy policy created successfully');
              setDescription(''); // Clear the textarea on successful submission
            } else {
              console.error('Failed to create privacy policy');
            }
          })
          .catch((err) => {
            console.error('Error dispatching action:', err);
          });
      }
    }
  };

  // const isSubmitDisabled = !description || error; 
const [isSubmitDisabled,setisSubmitDisabled]=useState(true)
useEffect(()=>{
  if(!description || error){
    setisSubmitDisabled(false)
  }

},[description,error])
  return (
    <>
      <div className="px-2 py-5">
        <div className="mb-4 w-1/2">
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none min-h-[200px]"
            rows={4}
          />
          {error && <p className="text-red-500">{error}</p>} {/* Show validation error */}
        </div>

        {/* Submit Button */}
        <div className="rounded-2xl">
          <button
            onClick={submitRecord}
            className={`h-[40px] px-5 rounded-2xl bg-[#000] text-[#D9E821] font-normal hover:bg-opacity-90 ${
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitDisabled} // Pass boolean value
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default ManagePrivacy;
