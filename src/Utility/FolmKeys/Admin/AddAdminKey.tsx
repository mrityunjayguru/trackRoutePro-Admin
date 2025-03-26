 export const AddAdminKey= [
    {
      label: 'Name*',
      name: 'Name',
      type: 'text',
      placeholder: 'Enter Name',
      value: '', // Dummy value
    },
    {
      label: 'Email ID/User ID *',
      name: 'emailAddress',
      type: 'email',
      placeholder: 'Enter Email ID',
      value: '', // Dummy value
    },
    {
      label: 'Mobile Number *',
      name: 'phone',
      type: 'text',
      placeholder: 'Enter Mobile',
      icon: null, // No icon specified, leave as null or add one if needed
      value: '', // Dummy value
    },
    {
      label: 'Password *',
      name: 'password',
      type: "password",
      placeholder: 'Enter Password',
      value: '', // Dummy value
    },
    {
      label: 'Confirm Password *',
      name: 'confirmPassword',
      type: "password",
      placeholder: 'Enter Password Again',
      value: '', // Dummy value
    },
    {
      label: 'Status *',
      name: 'status',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'Inactive'], // Example options for status
      value: 'Active', // Dummy value
    },
    {
      label: 'Upload Profile *',
      name: 'Document',
      type: 'file',
      placeholder: 'Upload',
      value: '', // Dummy value (you can add a sample file path if necessary)
    },
    {
      label: 'Subscribers*',
      name: 'Subscribers',
      type: 'checkboxGroup',
      options: [
        { label: 'Add', value: 'Add' },
        { label: 'update', value: 'update' },
        { label: 'View', value: 'View' },
    ],
    },
    {
      label: 'Device*',
      name: 'Device',
      type: 'checkboxGroup',
      options: [
        { label: 'Add', value: 'Add' },
        { label: 'update', value: 'update' },
        { label: 'View', value: 'View' },
    ],
    },
    {
      label: 'Map*',
      name: 'Map',
      type: 'checkboxGroup',
      options: [
        { label: 'View', value: 'View' },
    ],
    },
    {
      label: 'Notification*',
      name: 'Notification',
      type: 'checkboxGroup',
      options: [
        { label: 'Add', value: 'Add' },
        { label: 'View', value: 'View' },
    ],
    },
    {
      label: 'Support*',
      name: 'Support',
      type: 'checkboxGroup',
      options: [
        { label: 'update', value: 'update' },
        { label: 'View', value: 'View' },
    ],
    },
  ];
  
