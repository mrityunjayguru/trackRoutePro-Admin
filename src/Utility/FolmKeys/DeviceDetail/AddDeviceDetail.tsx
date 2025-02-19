
export const AddDeviceDetailKey = (devicetypeDetails: any) => {

  const DeviceType: any = devicetypeDetails?.map((vehicle: any) => ({
    label: vehicle.deviceType,
    value: vehicle._id,
  }));

  
  const filed:any= [
    {
      label: 'Device Type*',
      name: 'deviceType',
      type: 'select',
      placeholder: 'Choose Device',
      options: DeviceType, // Example options
      value: '', // Dummy value
    },
    {
      label: 'IMEI No.*',
      name: 'imei',
      type: 'text',
      placeholder: 'Enter IMEI No.',
      value: '', // Dummy value
      disabled: false,
    },
    {
        label: 'Device ID*',
        name: 'deviceId',
        type: 'text',
        placeholder: 'Enter Device ID.',
        value: '', // Dummy value
        disabled: false,
      },
    ]
  
      return filed
};
