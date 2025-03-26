import { formattedStates } from '../State';
export const ViewKeySubscriber = (SingleSubscriber: any,userpassword:any) => {
  console.log(SingleSubscriber,"SingleSubscriberSingleSubscriber")
  const field = [
    {
      label: 'Full Name *',
      name: 'Name',
      type: 'text',
      placeholder: 'Enter Name',
      value: SingleSubscriber?.Name || '',
      disabled: true,
    },
    {
      label: 'Email ID/User ID *',
      name: 'emailAddress',
      type: 'email',
      placeholder: 'Enter Email ID',
      value: SingleSubscriber?.emailAddress || '',
      disabled: true,
    },
    {
      label: 'Mobile Number *',
      name: 'phone',
      type: 'text',
      placeholder: 'Enter Mobile',
      value: SingleSubscriber?.phone || '',
      disabled: true,
    },
    {
      label: 'Password *',
      name: 'password',
      type: 'password',
      placeholder: 'Enter Password',
      value: userpassword, // Updated with the decrypted password
        disabled: true,

    },
    {
      label: 'Confirm Password *',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Enter Password Again',
      value: userpassword, // Updated with the decrypted password
        disabled: true,

    },
    {
      label: 'Status *',
      name: 'status',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'InActive'],
      value: SingleSubscriber?.status ? 'Active' : 'InActive',
      disabled: true,
    },
    {
      label: 'User Approval Status *',
      name: 'isApproved',
      type: 'select',
      placeholder: 'Select Status',
      options: ['Approved', 'Unapproved'],
      value: SingleSubscriber?.isApproved==true ? 'Approved' : 'Unapproved',
      disabled: false,
    }, 
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      placeholder: 'Select Gender',
      options: ['Male', 'Female', 'Other'],
      value: SingleSubscriber?.gender || '',
      disabled: true,
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      type: 'date',
      placeholder: 'Enter DOB',
      value: SingleSubscriber?.dob
        ? new Date(SingleSubscriber.dob).toISOString().split('T')[0]
        : '',
      disabled: true,
    },
    {
      label: 'Permanent Address *',
      name: 'address',
      type: 'text',
      placeholder: 'Enter Address',
      value: SingleSubscriber?.address || '',
      disabled: true,
    },
    {
      label: 'Country',
      name: 'country',
      type: 'select',
      placeholder: 'India',
      options: ['India'],
      value: SingleSubscriber?.country || 'India',
      disabled: true,
    },
    {
      label: 'State',
      name: 'state',
      type: 'select',
      placeholder: 'Choose State',
      options: formattedStates,
      value: SingleSubscriber?.state || '',
      disabled: true,
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      placeholder: 'Enter City',
      value: SingleSubscriber?.city || '',
      disabled: true,
    },
    {
      label: 'Pincode',
      name: 'pinCode',
      type: 'text',
      placeholder: 'Enter Pincode',
      value: SingleSubscriber?.pinCode || '',
      disabled: true,
    },
    {
      label: 'Identity Document *',
      name: 'idDocument',
      type: 'select',
      placeholder: 'Select ID Card',
      options: ['Aadhar Card', 'PAN Card', 'Driving License'],
      value: SingleSubscriber?.idDocument || '',
      disabled: true,
    },
    {
      label: 'ID Number *',
      name: 'idno',
      type: 'text',
      placeholder: 'Enter ID No.',
      value: SingleSubscriber?.idno || '',
      disabled: true,
    },
    {
      label: 'View Document*',
      name: 'Document',
      type: 'view',
      placeholder: 'Upload',
      value: SingleSubscriber?.Document || '',
      disabled: true,
    },
  ];
  return field;
};
