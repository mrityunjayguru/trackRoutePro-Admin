import { useSelector } from 'react-redux';

export const ViewDeviceKeys = (
  SingleDevice: any,
  VehiclwType: any,
  devicetypeDetails: any,
  DealerRecord: any,
) => {
  // Function to filter and get keys with true values
  const getKeysWithTrueValues = (obj: any): string[] => {
    return Object.entries(obj)
      .filter(([key, value]) => value === true) // Filter keys where value is true
      .map(([key]) => key); // Return the key as it is without modification
  };

  // Ensure the displayParameters exists and is populated before processing
  const displayParams = SingleDevice?.displayParameters || {};
  // Get the keys with true values
  const trueKeys = getKeysWithTrueValues(displayParams);

  const DeviceType: any = devicetypeDetails?.map((vehicle: any) => ({
    label: vehicle.deviceType,
    value: vehicle._id,
  }));

  const dealerRecord: any = DealerRecord?.map((dealer: any) => ({
    label: dealer.uniqueCode,
    value: dealer._id,
  }));
  const formData = useSelector((state: any) => state?.subscriber?.formData);
  console.log(SingleDevice, 'formDataformData');
  let fields: any = [
    {
      label: 'Device Type *',
      name: 'deviceType',
      type: 'select',
      placeholder: 'Choose Device',
      options: DeviceType,
      value: SingleDevice?.deviceTypeDetail?.deviceType,
      disabled: true,
    },
    {
      label: 'IMEI No. *',
      name: 'imei',
      type: 'text',
      placeholder: 'Enter IMEI No.',
      value: SingleDevice?.deviceTypeDetail?.imeiNo,
      disabled: true,
    },
    {
      label: 'vehicle Number *',
      name: 'vehicleNo',
      type: 'text',
      placeholder: 'Enter Device vehicle No.',
      value: SingleDevice.vehicleNo, // Dummy value
      disabled: true,
    },
    {
      label: 'Dealer Code *',
      name: 'dealerCode',
      type: 'select',
      placeholder: 'Select Dealer Code',
      options: dealerRecord,
      value: SingleDevice?.dealerCode,
      disabled: true,
    },
    {
      label: 'Device SIM No. *',
      name: 'deviceSimNumber',
      type: 'text',
      placeholder: 'Enter Device Mobile No.',
      value: SingleDevice?.deviceSimNumber,
      disabled: true,
    },
    {
      label: 'Operator',
      name: 'operator',
      type: 'select',
      placeholder: 'Choose Operator',
      options: ['Airtel', 'Jio', 'Vodafone', 'Other'],
      value: SingleDevice?.operator,
      disabled: true,
    },
    {
      label: 'Vehicle Category *',
      name: 'vehicleType',
      type: 'select',
      placeholder: 'Select Vehicle Type',
      options: VehiclwType,
      value: SingleDevice?.vehicleType,
      disabled: true,
    },
      {
      label: 'Vehicle Type *',
      name: 'isheavy',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['heavy', 'light'],
      value: SingleDevice?.isheavy==true?"light":"heavy",
      disabled: false,
    },
    {
      label: 'Device Status *',
      name: 'deviceStatus',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'InActive'],
      value: SingleDevice?.status,
      disabled: true,
    },
   {
      label: 'Vehicle duration *',
      name: 'duration',
      type: 'select',
      placeholder: 'Choose duration',
      options: ['1', '2',"3", "4", "5"],
      value: SingleDevice?.duration,
      deafultValue: '1',
      disabled: false,
    },
    {
      label: 'Device ID',
      name: 'deviceId',
      type: 'text',
      placeholder: 'Enter Device ID',
      value: SingleDevice?.deviceTypeDetail?.deviceId,
      disabled: true,
    },
    {
      label: 'Display Parameters *',
      name: 'displayParameters',
      type: 'checkboxGroup',
      disabled: true,     
      options: [
        { label: 'AC', value: 'AC', disabled: true },
        { label: 'Relay / Immobiliser', value: 'Relay', disabled: true },
        { label: 'GPS', value: 'GPS', disabled: true },
        { label: 'Door', value: 'Door', disabled: true },
        { label: 'GeoFencing', value: 'GeoFencing', disabled: true },
        { label: 'Network', value: 'Network', disabled: true },
        { label: 'Engine', value: 'Engine', disabled: true },
        { label: 'Parking', value: 'Parking', disabled: true },
        { label: 'Charging', value: 'Charging', disabled: true },
        { label: 'Temperature', value: 'temperature', disabled: true },
        { label: 'Humidity', value: 'humidity', disabled: true },
        { label: 'bluetooth', value: 'bluetooth', disabled: true },
        { label: 'internalBattery', value: 'internalBattery' },
        { label: 'extBattery', value: 'extBattery' },
        { label: 'vehicleMotion', value: 'vehicleMotion' },
         { label: 'view Address', value: 'isAddress' },
         { label: 'view Notification Address', value: 'isNotificationAddress' },
      ],
      value: trueKeys, // Display only the keys with 'true' values (e.g., 'AC')
    },
    {
      label: 'Fuel Status *',
      name: 'fuelStatus',
      type: 'radioGroup',
      options: [
        { label: 'Off', value: 'Off' },
        { label: 'On', value: 'On' },
      ],
      value: SingleDevice?.fuelStatus ? SingleDevice?.fuelStatus : 'Off',
      disabled: true,
    },
  ];
  if (SingleDevice.fuelStatus == 'On') {
    fields.push({
      label: 'Output *',
      name: 'fuleOutput',
      type: 'select',
      placeholder: 'Select Fuel System',
      options: ['Anolage/Voltage', 'Anolage/Ble', 'Anolage/Device'],
      value: SingleDevice?.fuleOutput,
      disabled: true,
    });
  }
  if (
    SingleDevice.fuleOutput === 'Anolage/Voltage' &&
    SingleDevice.fuelStatus == 'On'
  ) {
    fields.push(
      {
        label: 'Tank Capacity',
        name: 'tankCapacity',
        type: 'text',
        placeholder: 'Enter Fuel Tank Capacity',
        required: true,
        value: SingleDevice?.tankCapacity,
        disabled: true,
      },
      {
        label: 'Minimum Value',
        name: 'minimumValue',
        type: 'text',
        placeholder: 'Enter Value',
        required: true,
        value: SingleDevice?.minimumValue,
        disabled: true,
      },
      {
        label: 'Fill Difference',
        name: 'fillDifference',
        type: 'text',
        placeholder: 'Enter Value',
        required: true,
        value: SingleDevice?.fillDifference,
        disabled: true,
      },
      {
        label: 'Data Filtration Level',
        name: 'dataFiltrationLevel',
        type: 'text',
        placeholder: 'Data Filtration Level',
        required: true,
        value: SingleDevice?.dataFiltrationLevel,
        disabled: true,
      },
      {
        label: 'Maximum Value',
        name: 'maximumValue',
        type: 'text',
        placeholder: 'Enter Value',
        required: true,
        value: SingleDevice?.maximumValue || '',
        disabled: true,
      },
      {
        label: 'Drain Difference',
        name: 'drainDifference',
        type: 'text',
        placeholder: 'Enter Value',
        required: true,
        value: SingleDevice?.drainDifference,
        disabled: true,
      },
    );
  }

  if (
    SingleDevice.fuleOutput === 'Anolage/Ble' &&
    SingleDevice.fuelStatus == 'On'
  ) {
    fields.push(
      {
        label: 'Tank Capacity',
        name: 'tankCapacity',
        type: 'text',
        placeholder: 'Enter Fuel Tank Capacity',
        required: true,
        value: SingleDevice?.tankCapacity,
        disabled: true,
      },
      {
        label: 'Fill Difference',
        name: 'fillDifference',
        type: 'text',
        placeholder: 'Enter Value',
        required: true,
        value: SingleDevice?.fillDifference,
        disabled: true,
      },
      {
        label: 'Data Filtration Level',
        name: 'dataFiltrationLevel',
        type: 'text',
        placeholder: '10',
        required: true,
        value: SingleDevice?.dataFiltrationLevel,
        disabled: true,
      },
      {
        label: 'Drain Difference',
        name: 'drainDifference',
        type: 'text',
        placeholder: 'Enter Value',
        required: true,
        value: SingleDevice?.drainDifference,
        disabled: true,
      },
    );
  }

  return fields;
};
