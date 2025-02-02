import { formatDateToDDMMMYYYY } from "../ManageDate";

export const ManageNestedKey=(colKey: string, val: any)=>{
    console.log(val,"valvalval")

    if (colKey === 'updatedAt') {
        return formatDateToDDMMMYYYY(val);
      } 
     else if (colKey === 'createdDealerRecord') {
        return val?.uniqueCode || 'N/A';  
      }
      else if (colKey === 'deviceType') {
        return val?.deviceType || 'N/A';  
      }
      else  if(colKey=='Assignedon'){
        return formatDateToDDMMMYYYY(val?.userDevices?.createdAt) || "-"
      }
      else if(colKey==='owneriddetail'){
        console.log(val,"valval")
        return val?.userDevices?.owneriddetail?.uniqueCode || "-"
      }
      else  if(colKey==='Assignedto'){
        return val?.userDevices?.dealerCode?.uniqueCode || "-"
      }
      else if(colKey==='DealerCode'){
        return val?.userDevices?.dealerCode?.uniqueCode || "-"
      }
      
      else {
        return val;
      }
}