import { formattedStates } from '../State';

export const addTopicKeys = [
  {
    label: 'title*',
    name: 'title',
    type: 'text',
    placeholder: 'Enter title',
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
    label: 'Status *',
    name: 'status',
    type: 'select',
    placeholder: 'Choose Status',
    options: ['Active', 'Inactive'],
    value: 'Active',
    disabled: false,
  },
];
