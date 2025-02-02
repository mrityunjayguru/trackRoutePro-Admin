import { formattedStates } from '../State';

export const DviewCompanySubscriberkey = (SingleSubscriber:any, userpassword:any) => {

  const fields= [
    {
      label: 'Company Name*',
      name: 'Name',
      type: 'text',
      placeholder: 'Enter Name',
      value: SingleSubscriber?.Name || '',
    },
    {
      label: 'Email ID/User ID *',
      name: 'emailAddress',
      type: 'email',
      placeholder: 'Enter Email ID',
      value: SingleSubscriber?.emailAddress || '',
    },
    {
      label: 'Mobile Number *',
      name: 'phone',
      type: 'text',
      placeholder: 'Enter Mobile',
      icon: null,
      value: SingleSubscriber?.phone || '',
    },
 
    {
      label: 'Status *',
      name: 'status',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'Inactive'],
      value: SingleSubscriber?.status ? 'Active' : 'Inactive',
    },
    {
      label: 'Contact Person Name*',
      name: 'contactPerson',
      type: 'text',
      placeholder: 'Enter Contact Person Name',
      value: SingleSubscriber?.contactPerson || '',
    },
    {
      label: 'Contact Person Designation*',
      name: 'PersonDesignation',
      type: 'text',
      placeholder: 'Enter Contact Person Designation',
      value: SingleSubscriber?.PersonDesignation || '',
    },
    {
      label: 'Company Registered Address*',
      name: 'address',
      type: 'text',
      placeholder: 'Enter Address',
      value: SingleSubscriber?.address || '',
    },
    {
      label: 'Country',
      name: 'country',
      type: 'select',
      placeholder: 'India',
      options: ['India'],
      disabled: true,
      value: SingleSubscriber?.country || 'India',
    },
    {
      label: 'State',
      name: 'state',
      type: 'select',
      placeholder: 'Choose State',
      options: formattedStates,
      disabled: true,
      value: SingleSubscriber?.state || '',
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      placeholder: 'Enter City',
      value: SingleSubscriber?.city || '',
    },
    {
      label: 'Pincode',
      name: 'pinCode',
      type: 'text',
      placeholder: 'Enter Pincode',
      value: SingleSubscriber?.pinCode || '',
      disabled: true

    },
 
  ];
  if( SingleSubscriber.isView==true){
    fields.push(
      {
        label: 'Password *',
        name: 'password',
        type: "password",
        placeholder: 'Enter Password',
        value: userpassword || '',
        disabled: true
      },
      {
        label: 'Confirm Password *',
        name: 'confirmPassword',
        type: "password",
        placeholder: 'Enter Password Again',
        value:userpassword,
        disabled: true

      },
      {
        label: 'Company Identity Document*',
        name: 'idDocument',
        type: 'select',
        placeholder: 'Select ID Card',
        options: ['gstNumber', 'companyRegCertificate', 'tradeLicense'],
        value: SingleSubscriber?.idDocument || '',
        disabled: true

      },
      {
        label: 'ID Number *',
        name: 'idno',
        type: 'text',
        placeholder: 'Enter ID No.',
        value: SingleSubscriber?.idno || '',
        disabled: true

      },
      {
          label: 'View Document*',
          name: 'Document',
          type: 'view',
          placeholder: 'Upload',
          value: SingleSubscriber?.Document || '',
          disabled: true,
        },
      )
    }
  return fields
};
