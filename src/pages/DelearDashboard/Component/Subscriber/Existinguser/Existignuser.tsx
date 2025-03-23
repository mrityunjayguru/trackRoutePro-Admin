import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import {
  checkExistingUser,
  setBlankcheckExistingUser,
} from '../../../../../api/existingUser';
import { useEffect, useState } from 'react';
import ExistingUserDetail from './ExistingUserDetail';
import { useNavigate } from 'react-router-dom';

function ExistingUser() {
  const dispatch = useDispatch<AppDispatch>();
  const existingUser = useSelector(
    (state: any) => state.subscriber.singleSubscriber,
  );

  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle phone number input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
      setError(null);
    } else {
      setError('Only numeric values are allowed');
    }
  };

  // Handle submit action
  const handleClick = async () => {
    if (!phone || phone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    const payload:any = { phone };
    const response:any = await dispatch(checkExistingUser(payload));

    if (response.payload.data == null) {
      navigate('/DealerAddSubscriber');
    }
  };

  // Handle "Add new" action
  const handleAddNew = () => {
    if (existingUser) {
      navigate('/DealerAddDevices');
    }
  };

  useEffect(() => {
    if (!phone) {
      const payload:any={}
      dispatch(setBlankcheckExistingUser(payload));
    }
  }, []);

  return (
    <div>
      <p>Enter Subscriber Phone Number</p>

      <div className="full my-2">
        <input
          onChange={handleChange}
          value={phone}
          placeholder="Enter Phone number"
          type="text"
          maxLength={10}
          className="w-1/3 pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
        />
        <button
          onClick={handleClick}
          className="w-[200px] bg-[#000000] mx-5 text-[#D9E821] py-2 rounded-lg font-medium transition"
        >
          Submit
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {existingUser && Object.keys(existingUser).length > 0 && (
        <div className="mt-20">
          <ExistingUserDetail />

          <div className="my-5">
            <button
              onClick={handleAddNew}
              className="w-[200px] bg-[#000000] mx-5 text-[#D9E821] py-2 rounded-lg font-medium transition"
            >
              Add new +
            </button>
            <button
              onClick={() => navigate('/DealerDashboard')}
              className="w-[200px] border mx-5 text-[#000000] py-2 rounded-lg font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExistingUser;
