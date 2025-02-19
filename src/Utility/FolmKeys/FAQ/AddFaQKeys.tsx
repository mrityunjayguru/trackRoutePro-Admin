import { formattedStates } from '../State';
export const addTopicKeys=(topics:any)=>{
  const formattedVehicleTypes = topics?.map((vehicle: any) => ({
    label: vehicle.title,
    value: vehicle._id,
  }));
return[
  {
    label: 'title*',
    name: 'title',
    type: 'text',
    placeholder: 'Enter title',
    value: '', // Dummy value
  },
  {
    label: 'topic*',
    name: 'topic',
    type: 'select',
    options:formattedVehicleTypes, // Example options
    placeholder: 'Enter topic',
    value: '', // Dummy value
  },
  {
    label: 'priority *',
    name: 'priority',
    type: 'number',
    placeholder: 'Enter priority',
    value: '', // Dummy value
  },
  {
    label: 'description *',
    name: 'description',
    type: 'text',
    placeholder: 'Enter description',
    value: '', // Dummy value
  },
  {
    label: 'Status *',
    name: 'status',
    type: 'select',
    placeholder: 'Choose Status',
    options: ['Active', 'Inactive'],
    value: 'Active',
    disabled: false,
  },
];


}