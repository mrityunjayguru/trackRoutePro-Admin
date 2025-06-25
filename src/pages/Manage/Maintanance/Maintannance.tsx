import { useEffect, useState } from 'react';
import HandleSetting from './Component/HandleSetting';
import { useSelector, useDispatch } from 'react-redux';
import { getMaintenance } from '../../../api/setting';
import { AppDispatch } from '../../../store/store';
import Breadcrumb from '../../../common/Breadcrumb';

function Maintannance() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state.setting.mainenance);
  const [setting, setSetting] = useState<any[]>([]);

  // Load settings from Redux store into local state when available
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setSetting(data);
    }
  }, [data]);

  // Initial fetch on mount
  useEffect(() => {
    dispatch(getMaintenance({ someField: '' })); // Provide a valid value for someField
  }, [dispatch]);

  return (
    <div className="p-4">
      <Breadcrumb />

      {setting.length > 0 ? (
        <HandleSetting text="Maintenance" data={setting[0]} />
      ) : (
        <div className="text-center text-gray-500 mt-10">No maintenance settings found.</div>
      )}
    </div>
  );
}

export default Maintannance;
