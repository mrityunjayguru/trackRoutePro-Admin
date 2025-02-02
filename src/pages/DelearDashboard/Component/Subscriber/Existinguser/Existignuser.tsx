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
  // Redux dispatch and state selectors
  const dispatch = useDispatch<AppDispatch>();
  const existingUser = useSelector(
    (state: any) => state.subscriber.singleSubscriber,
  );

  // Local state for phone number input
  const [phone, setPhone] = useState<string | null>(null);

  // Navigation hook
  const navigate = useNavigate();

  // Handle submit action when phone number is entered
  const handleClick = async () => {
    if (phone == '') {
      return;
    }
    if (phone) {
      const payload: any = { phone };
      let responce: any = await dispatch(checkExistingUser(payload));

      if (responce.payload.data == null) {
        navigate('/DealerAddSubscriber');
      }
    }
  };

  // Handle the "Add new" action if no existing user is found
  const handleAddNew = () => {
    if (existingUser) {
      navigate('/DealerAddDevices');
    }
  };

  useEffect(() => {
    if (phone == null) {
      const payload: any = {};
      dispatch(setBlankcheckExistingUser(payload));
    }
  }, []);

  return (
    <div>
      <p>Enter Subscriber Phone Number</p>

      <div className="full my-2">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
          placeholder="Enter Phone number"
          type="text"
          className="w-1/3 pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
        />
        <button
          onClick={handleClick}
          className="w-[200px] bg-[#000000] mx-5 text-[#D9E821] py-2 rounded-lg font-medium transition"
        >
          Submit
        </button>
      </div>

      {existingUser != null && Object.keys(existingUser).length > 0 && (
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
              onClick={() => navigate('/DealearDashboard')}
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
