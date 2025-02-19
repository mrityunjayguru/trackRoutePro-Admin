import { useEffect } from "react";
import { useSelector } from "react-redux";

export const editDeviceKeysRequest = (
  SingleDevice: any, 
  VehiclwType: any, 
  devicetypeDetails: any, 
  DealerRecord: any
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
 
  // Initialize the fields array
  let fields: any = [
    {
      label: 'IMEI No. *',
      name: 'imei',
      type: 'text',
      placeholder: 'Enter IMEI No.',
      value:SingleDevice?.imediDetail?.imeiNo,
      disabled: false,
    },
    {
      label: 'vehicle Number *',
      name: 'vehicleNo',
      type: 'text',
      placeholder: 'Enter Device vehicle No.',
      value: SingleDevice.vehicleNo, // Dummy value
    },
    {
      label: 'Dealer Code *',
      name: 'dealerCode',
      type: 'select',
      placeholder: 'Select Dealer Code',
      options: dealerRecord,
      value: SingleDevice?.dealerCode,
      disabled: false,
    },
    {
      label: 'Device SIM No. *',
      name: 'deviceSimNumber',
      type: 'text',
      placeholder: 'Enter Device Mobile No.',
      value: SingleDevice?.deviceSimNumber,
    },
    {
      label: 'Operator',
      name: 'operator',
      type: 'select',
      placeholder: 'Choose Operator',
      options: ['Airtel', 'Jio', 'Vodafone', 'Other'],
      value: SingleDevice?.operator,
      disabled: false,
    },
    {
      label: 'Vehicle Category *',
      name: 'vehicleType',
      type: 'select',
      placeholder: 'Select Vehicle Type',
      options: VehiclwType,
      value: SingleDevice?.vehicleType,
      disabled: false,
    },
    {
      label: 'Device Status *',
      name: 'deviceStatus',
      type: 'select',
      placeholder: 'Choose Status',
      options: ['Active', 'Inactive'],
      value: SingleDevice?.status,
      disabled: false,
    },
    {
      label: 'Display Parameters *',
      name: 'displayParameters',
      type: 'checkboxGroup',
      options: [
        { label: 'AC', value: 'AC' },
        { label: 'Relay / Immobiliser', value: 'Relay' },
        { label: 'GPS', value: 'GPS' },
        { label: 'Door', value: 'Door' },
        { label: 'GeoFencing', value: 'GeoFencing' },
        { label: 'Network', value: 'Network' },
        { label: 'Engine', value: 'Engine' },
        { label: 'Parking', value: 'Parking' },
        { label: 'Charging', value: 'Charging' },
        { label: 'Temperature', value: 'temperature' },
        { label: 'Humidity', value: 'humidity' },
        { label: 'bluetooth', value: 'bluetooth' },
      ],
      value: trueKeys,  // Display only the keys with 'true' values (e.g., 'AC')
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
      disabled: false,
    },

  ];
  if(formData.fuelStatus=="On"){
    fields.push(   {
      label: 'Output *',
      name: 'fuleOutput',
      type: 'select',
      placeholder: 'Select Fuel System',
      options: ['Anolage/Voltage', 'Anolage/Ble', 'Anolage/Device'],
      value: SingleDevice?.fuleOutput,
      disabled: false,
    },)
    }
  if (formData.fuleOutput === "Anolage/Voltage" && formData.fuelStatus=="On") {
    fields.push(
      {
        label: "Tank Capacity",
        name: "tankCapacity",
        type: "text",
        placeholder: "Enter Fuel Tank Capacity",
        required: true,
        value: SingleDevice?.tankCapacity,

      },
      {
        label: "Minimum Value",
        name: "minimumValue",
        type: "text",
        placeholder: "Enter Value",
        required: true,
        value: SingleDevice?.minimumValue,

      },
      {
        label: "Fill Difference",
        name: "fillDifference",
        type: "text",
        placeholder: "Enter Value",
        required: true,
        value: SingleDevice?.fillDifference,

      },
      {
        label: "Data Filtration Level",
        name: "dataFiltrationLevel",
        type: "text",
        placeholder: "10",
        required: true,
        value: SingleDevice?.dataFiltrationLevel,

      },
      {
        label: "Maximum Value",
        name: "maximumValue",
        type: "text",
        placeholder: "Enter Value",
        required: true,
        value: SingleDevice?.maximumValue || "",

      },
      {
        label: "Drain Difference",
        name: "drainDifference",
        type: "text",
        placeholder: "Enter Value",
        required: true,
        value: SingleDevice?.drainDifference,

      }
    );
  }

  if (formData.fuleOutput === "Anolage/Ble" && formData.fuelStatus=="On") {
    fields.push(
      {
        label: "Tank Capacity",
        name: "tankCapacity",
        type: "text",
        placeholder: "Enter Fuel Tank Capacity",
        required: true,
        value: SingleDevice?.tankCapacity,

      },
      {
        label: "Fill Difference",
        name: "fillDifference",
        type: "text",
        placeholder: "Enter Value",
        required: true,
        value: SingleDevice?.fillDifference,

      },
      {
        label: "Data Filtration Level",
        name: "dataFiltrationLevel",
        type: "text",
        placeholder: "10",
        required: true,
        value: SingleDevice?.dataFiltrationLevel,

      },
      {
        label: "Drain Difference",
        name: "drainDifference",
        type: "text",
        placeholder: "Enter Value",
        required: true,
        value: SingleDevice?.drainDifference,

      }
    );
  }

  return fields; // Return the form fields array
};
