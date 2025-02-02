import { formattedStates } from '../State';


export const EditDelearKey = (SingleSubscriber: any,userpassword:any) => {

  return [
    {
      label: 'Dealer Full Name *',
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
      icon: null,
      value: SingleSubscriber?.phone || '',
      disabled:false,
    },
    {
      label: 'Password *',
      name: 'password',
      type: 'password',
      placeholder: 'Enter Password',
      value: userpassword || '', // Use decrypted password
      disabled:false,
    },
    {
      label: 'Confirm Password *',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Enter Password Again',
      value: userpassword || '', // Use decrypted password
      disabled:false,
    },
    {
      label: 'Status *',
      name: 'status',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'Inactive'],
      value: SingleSubscriber?.status ? 'Active' : 'Inactive',
      disabled:false,
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
      value: SingleSubscriber?.dob ? new Date(SingleSubscriber.dob).toISOString().split('T')[0] : '',
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
      disabled: false,
      value: SingleSubscriber?.country || 'India',
    },
    {
      label: 'State',
      name: 'state',
      type: 'select',
      placeholder: 'Choose State',
      options: formattedStates,
      disabled: false,
      value: SingleSubscriber?.state || '',
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      placeholder: 'Enter City',
      disabled: false,
      value: SingleSubscriber?.city || '',
    },
    {
      label: 'Pincode',
      name: 'pinCode',
      type: 'text',
      placeholder: 'Enter Pincode',
      disabled: false,
      value: SingleSubscriber?.pinCode || '',
    },
    {
      label: 'Identity Document *',
      name: 'idDocument',
      type: 'select',
      placeholder: 'Select ID Card',
      options: ['Aadhar Card', 'PAN Card', 'Driving License'],
      value: SingleSubscriber?.idDocument || '',
      disabled:false,
    },
    {
      label: 'ID Number *',
      name: 'idno',
      type: 'text',
      placeholder: 'Enter ID No.',
      value: SingleSubscriber?.idno || '',
      disabled:false,
    },
    {
      label: 'View Document*',
      name: 'Document',
      type: 'view',
      placeholder: 'Upload',
      value: SingleSubscriber?.Document || '',
      disabled:false,
    },
  ];
};

import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const SECRET_KEY = 'TRACKROUTE_PRO-encryption-key'; // Use a secure key and store it safely

// Encrypt function
export const encrypt = (text: string): string => {
  const encrypted = AES.encrypt(text, SECRET_KEY).toString();
  return encrypted;
};

// Decrypt function
export const decrypt = (text: string): Promise<string> => {
  const decrypted = AES.decrypt(text, SECRET_KEY).toString(Utf8);
  console.log(decrypted, "decrypted");
  return Promise.resolve(decrypted); // Ensure it's a promise
};
