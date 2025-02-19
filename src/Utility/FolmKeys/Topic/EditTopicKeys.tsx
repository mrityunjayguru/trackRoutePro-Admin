import { formattedStates } from '../State';


export const EditTopicKeys=(singlfawlist:any,topic:any)=>{
return [
  {
    label: 'title*',
    name: 'title',
    type: 'text',
    placeholder: 'Enter title',
    value:singlfawlist.title, // Dummy value
  },
  {
    label: 'priority *',
    name: 'priority',
    type: 'number',
    placeholder: 'Enter priority',
    value: singlfawlist.priority, // Dummy value
  },
  {
    label: 'Status *',
    name: 'status',
    type: 'select',
    placeholder: 'Choose Status',
    options: ['Active', 'Inactive'],
    value:  singlfawlist.status,
   
  },
]
}

