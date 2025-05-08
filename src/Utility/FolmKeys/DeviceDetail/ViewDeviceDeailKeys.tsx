export const ViewDeviceDeailKeys = (
  deviceDetail: any,
  devicetypeDetails: any,
) => {
  console.log(deviceDetail?.assigned=="Assigned"
    , "deviceDetaildeviceDetail");

  // Get the Device Type options from devicetypeDetails
  const DeviceType: any = devicetypeDetails?.map((vehicle: any) => ({
    label: vehicle.deviceType,
    value: vehicle._id,
  }));

  // Set up the fields array with actual values passed from the deviceDetail
  const filed: any = [
    {
      label: 'Device Type*',
      name: 'deviceType',
      type: 'select',
      placeholder: 'Choose Device',
      options: DeviceType, // Using DeviceType options
      value: deviceDetail.deviceType?._id, // Strictly pass value from deviceDetail
      disabled:deviceDetail?.assigned=="Assigned"?true:false
    },
    {
      label: 'IMEI No.*',
      name: 'imei',
      type: 'text',
      placeholder: 'Enter IMEI No.',
      value: deviceDetail?.imeiNo, // Strictly pass value from deviceDetail
      disabled:deviceDetail?.assigned=="Assigned"?true:false
    },
    {
      label: 'Device ID*',
      name: 'deviceId',
      type: 'text',
      placeholder: 'Enter Device ID',
      value: deviceDetail?.deviceId, // Strictly pass value from deviceDetail
      disabled:deviceDetail?.assigned=="Assigned"?true:false
    },
    {
      label: 'Wired Device *',
      name: 'isWired',
      type: 'select',
      placeholder: 'Choose Device',
     options: ["true","false"], // Example options
      value:deviceDetail?.isWired?"true":"false", // Dummy value
      disabled:deviceDetail?.assigned=="Assigned"?true:false
    },
  ];

  return filed;
};
