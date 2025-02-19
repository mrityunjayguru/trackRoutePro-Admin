import { formattedStates } from '../State';
export const EditFaQKeys=(single:any,topics:any)=>{
  console.log(single,"llllllllllllllll")
  const formattedVehicleTypes = topics?.map((data: any) => ({
    label: data.title,
    value: data._id,
  }));
return[
  {
    label: 'title*',
    name: 'title',
    type: 'text',
    placeholder: 'Enter title',
    value:single.title, // Dummy value
  },
  {
    label: 'topic*',
    name: 'topic',
    type: 'select',
    options:formattedVehicleTypes, // Example options
    placeholder: 'Enter topic',
    value:single?.topic?._id, // Dummy value
  },
  {
    label: 'priority *',
    name: 'priority',
    type: 'number',
    placeholder: 'Enter priority',
    value:single.priority, // Dummy value
  },
  {
    label: 'description *',
    name: 'description',
    type: 'text',
    placeholder: 'Enter description',
    value:single.description, // Dummy value
  },
  {
    label: 'Status *',
    name: 'status',
    type: 'select',
    placeholder: 'Choose Status',
    options: ['Active', 'Inactive'],
    value:single.status,
    disabled: false,
  },
];


}