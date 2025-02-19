import { formattedStates } from '../State';
export const DEditUserSubscriberKey = (SingleSubscriber: any,userpassword:any) => {
  console.log(SingleSubscriber,"SingleSubscriberSingleSubscriber")
  const field = [
    {
      label: 'Full Name *',
      name: 'Name',
      type: 'text',
      placeholder: 'Enter Name',
      value: SingleSubscriber?.Name || '',
      disabled:false,
    },
    {
      label: 'Email ID/User ID *',
      name: 'emailAddress',
      type: 'email',
      placeholder: 'Enter Email ID',
      value: SingleSubscriber?.emailAddress || '',
      disabled:false,
    },
    {
      label: 'Mobile Number *',
      name: 'phone',
      type: 'text',
      placeholder: 'Enter Mobile',
      value: SingleSubscriber?.phone || '',
      disabled:false,
    },
  
    {
      label: 'Status *',
      name: 'status',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'InActive'],
      value: 'InActive',
      disabled:true,
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      placeholder: 'Select Gender',
      options: ['Male', 'Female', 'Other'],
      value: SingleSubscriber?.gender || '',
      disabled:false,
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      type: 'date',
      placeholder: 'Enter DOB',
      value: SingleSubscriber?.dob
        ? new Date(SingleSubscriber.dob).toISOString().split('T')[0]
        : '',
      disabled:false,
    },
    {
      label: 'Permanent Address *',
      name: 'address',
      type: 'text',
      placeholder: 'Enter Address',
      value: SingleSubscriber?.address || '',
      disabled:false,
    },
    {
      label: 'Country',
      name: 'country',
      type: 'select',
      placeholder: 'India',
      options: ['India'],
      value: SingleSubscriber?.country || 'India',
      disabled:false,
    },
    {
      label: 'State',
      name: 'state',
      type: 'select',
      placeholder: 'Choose State',
      options: formattedStates,
      value: SingleSubscriber?.state || '',
      disabled:false,
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      placeholder: 'Enter City',
      value: SingleSubscriber?.city || '',
      disabled:false,
    },
    {
      label: 'Pincode',
      name: 'pinCode',
      type: 'text',
      placeholder: 'Enter Pincode',
      value: SingleSubscriber?.pinCode || '',
      disabled:false,
    },
  ];
  if( SingleSubscriber.isView==true){
    field.push(
      {
        label: 'Password *',
        name: 'password',
        type: "password",
        placeholder: 'Enter Password',
        value: userpassword || '',
        disabled:false
      },
      {
        label: 'Confirm Password *',
        name: 'confirmPassword',
        type: "password",
        placeholder: 'Enter Password Again',
        value:userpassword,
        disabled:false

      },
      {
        label: 'Company Identity Document*',
        name: 'idDocument',
        type: 'select',
        placeholder: 'Select ID Card',
        options: ['Aadhar Card', 'PAN Card', 'Driving License'], // Example options
        value: SingleSubscriber?.idDocument || '',
        disabled:false

      },
      {
        label: 'ID Number *',
        name: 'idno',
        type: 'text',
        placeholder: 'Enter ID No.',
        value: SingleSubscriber?.idno || '',
        disabled:false

      },
      {
          label: 'View Document*',
          name: 'Document',
          type: 'view',
          placeholder: 'Upload',
          value: SingleSubscriber?.Document || '',
          disabled:false,
        },
      )
    }
  return field;
};
