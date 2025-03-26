import { useSelector } from 'react-redux';
import ManageVehicle from './component/ManageVehicle'
import VehicleTable from './component/VehicleTable'
function Vehicle() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  return (
    <div>
       { loginUser.role=="SuperAdmin"?(
        <ManageVehicle/>

       ):(null)}
  
      <VehicleTable />
    </div>
  )
}

export default Vehicle
