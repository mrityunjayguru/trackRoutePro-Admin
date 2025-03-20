import { useSelector } from 'react-redux';

export const DealervehicleFields = (
  devicetypeDetails: any,
  DealerRecord: any,
) => {
  let vehicleTypeData: any = localStorage.getItem('vehicleTypeData');
  let parsedata = JSON.parse(vehicleTypeData);
  const formattedVehicleTypes = parsedata?.map((vehicle: any) => ({
    label: vehicle.vehicleTypeName,
    value: vehicle._id,
    icon: vehicle.icons,
  }));
  const DeviceType: any = devicetypeDetails?.map((vehicle: any) => ({
    label: vehicle.deviceType,
    value: vehicle._id,
  }));

  const formData: any = useSelector(
    (state: any) => state?.subscriber?.formData,
  );
  let fields: any = [
    {
      label: 'IMEI No. *',
      name: 'imei',
      type: 'text',
      placeholder: 'Enter IMEI No.',
      value: '', // Dummy value
      disabled: false,
    },
    {
      label: 'vehicle Number *',
      name: 'vehicleNo',
      type: 'text',
      placeholder: 'Enter Device vehicle No.',
      value: '', // Dummy value
    },
    {
      label: 'Device SIM No. *',
      name: 'deviceSimNumber',
      type: 'text',
      placeholder: 'Enter Device Mobile No.',
      value: '', // Dummy value
    },
    {
      label: 'Operator',
      name: 'operator',
      type: 'select',
      placeholder: 'Choose Operator', // Default value
      options: ['Airtel', 'Jio', 'Vodafone', 'Other'], // Example options
      value: 'Airtel', // Dummy value
    },
    {
      label: 'Vehicle Category *',
      name: 'vehicleType',
      type: 'select',
      placeholder: 'Select Vehicle Type',
      options: formattedVehicleTypes, // Example options
      value: '', // Dummy value (first option)
    },
    {
      label: 'Device Status *',
      name: 'deviceStatus',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'InActive'], // Example options
      value: 'Active', // Dummy value
    },
   
    {
      label: 'Fuel Status *',
      name: 'fuelStatus',
      type: 'radioGroup',
      options: [
        { label: 'Off', value: 'Off' },
        { label: 'On', value: 'On' },
      ],
      value: 'Off', 
    },
  ];
  if (formData.fuelStatus == 'On') {
    fields.push({
      label: 'Output *',
      name: 'fuleOutput',
      type: 'select',
      placeholder: 'Select Fuel System',
      options: ['Anolage/Voltage', 'Anolage/Ble', 'Anolage/Device'], // Example options
      value: '', // Dummy value
    });
  }
  if (formData.fuleOutput === 'Anolage/Voltage' && formData.fuelStatus == 'On') {
    fields.push(
      {
        label: 'Tank Capacity',
        name: 'tankCapacity',
        type: 'Number',
        placeholder: 'Enter Fuel Tank Capacity',
        required: true,
        value: '',
      },
      {
        label: 'Minimum Value',
        name: 'minimumValue',
        type: 'Number',
        placeholder: 'Enter Value',
        required: true,
        value: '',
      },
      {
        label: 'Fill Difference',
        name: 'fillDifference',
        type: 'Number',
        placeholder: 'Enter Value',
        required: true,
        value: '',
      },
      {
        label: 'Data Filtration Level',
        name: 'dataFiltrationLevel',
        type: 'Number',
        placeholder: '10',
        required: true,
        value: '',
      },
      {
        label: 'Maximum Value',
        name: 'maximumValue',
        placeholder: 'Enter Value',
        required: true,
        value: '',
        type: 'Number',
      },
      {
        label: 'Drain Difference',
        name: 'drainDifference',
        placeholder: 'Enter Value',
        required: true,
        value: '',
        type: 'Number',
      },
    );
  }

  if (formData.fuleOutput === 'Anolage/Ble' && formData.fuelStatus == 'On') {
    fields.push(
      {
        label: 'Tank Capacity',
        name: 'tankCapacity',
        type: 'Number',
        placeholder: 'Enter Fuel Tank Capacity',
        required: true,
        value: '',
      },
      {
        label: 'Fill Difference',
        name: 'fillDifference',
        type: 'Number',
        placeholder: 'Enter Value',
        required: true,
        value: '',
      },
      {
        label: 'Data Filtration Level',
        name: 'dataFiltrationLevel',
        type: 'Number',
        placeholder: '10',
        required: true,
        value: '',
      },
      {
        label: 'Drain Difference',
        name: 'drainDifference',
        type: 'Number',
        placeholder: 'Enter Value',
        required: true,
        value: '',
      },
    );
  }
  return fields;
};
