import { useSelector } from "react-redux";

export const AppDeviceEditKeys = (SingleDevice: any, VehiclwType: any,devicetypeDetails:any,DealerRecord:any) => {
    
    const getKeysWithTrueValues = (obj: any): string[] => {
        let myval = Object.entries(obj)
            .filter(([key, value]) => value === true) // Filter keys where value is true
            .map(([key]) => key); // Return the key as it is without modification

        return myval;
    };

    // Ensure the displayParameters exists and is populated before processing
    const displayParams = SingleDevice?.displayParameters || {};
    const trueKeys = getKeysWithTrueValues(displayParams);
 
    const formData:any = useSelector((state: any) => state?.subscriber?.formData);

    const fields:any= [
        {
            label: 'IMEI No. *',
            name: 'imei',
            type: 'text',
            placeholder: 'Enter IMEI No.',
            value:SingleDevice?.deviceTypeDetail?.deviceType?.imeiNo,
            disabled:false,
        },
        {
          label: 'vehicle Number *',
          name: 'vehicleNo',
          type: 'text',
          placeholder: 'Enter Device vehicle No.',
          value: SingleDevice.vehicleNo, // Dummy value
        },
        {
            label: 'Device SIM No. *',
            name: 'deviceSimNumber',
            type: 'text',
            placeholder: 'Enter Device Mobile No.',
            value: SingleDevice?.deviceSimNumber,
            disabled:false,
        },
        {
            label: 'Operator',
            name: 'operator',
            type: 'select',
            placeholder: 'Choose Operator',
            options: ['Airtel', 'Jio', 'Vodafone', 'Other'],
            value: SingleDevice?.operator,
            disabled:false,

        },
        {
            label: 'Vehicle Category *',
            name: 'vehicleType',
            type: 'select',
            placeholder: 'Select Vehicle Type',
            options: VehiclwType,
            value: SingleDevice?.vehicleType,
            disabled:false,

        },
        {
            label: 'Device Status *',
            name: 'deviceStatus',
            type: 'select',
            placeholder: 'Choose Status',
            options: ['Active', 'InActive'],
            value: SingleDevice?.status,
            disabled:false,

        },
        {
          label: 'Device Type *',
          name: 'isWired',
          type: 'radioGroup',
          options: [
            { label: 'Wired', value: 'true' },
            { label: 'Wireless', value: 'false' },
          ],
          value:SingleDevice?.isWired?"true":"false", 
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
            disabled:false,

        },
        {
            label: 'Output *',
            name: 'fuleOutput',
            type: 'select',
            placeholder: 'Select Fuel System',
            options: ['Anolage/Voltage', 'Anolage/Ble', 'Anolage/Device'], // Example options
            value: SingleDevice?.output?SingleDevice?.fuleOutput:'System 1',
            disabled:false,

        },
    ];
    if(formData.isWired=="true"){
      fields.push(
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
            { label: 'Bluetooth', value: 'bluetooth' },
            { label: 'Device Battery', value: 'internalBattery' },
            { label: 'Vehicle Battery', value: 'extBattery' },
            { label: 'Vehicle Motion', value: 'vehicleMotion' },
          { label: 'view Address', value: 'vehicleMotion' },

        ],
        value: trueKeys,  // Display only the keys with 'true' values (e.g., 'AC')
  
        },
      )
    }else{
      fields.push(
        {
          label: 'Display Parameters *',
          name: 'displayParameters',
          type: 'checkboxGroup',
          options: [
            { label: 'GPS', value: 'GPS' },
            { label: 'GeoFencing', value: 'GeoFencing' },
            { label: 'Network', value: 'Network' },
            { label: 'Parking', value: 'Parking' },
            { label: 'Temperature', value: 'temperature' },
            { label: 'Humidity', value: 'humidity' },
            { label: 'Bluetooth', value: 'bluetooth' },
            { label: 'Device Battery', value: 'internalBattery' },
            { label: 'Vehicle Motion', value: 'vehicleMotion' },
          { label: 'view Address', value: 'vehicleMotion' },

        ],
        value: trueKeys,  // Display only the keys with 'true' values (e.g., 'AC')
  
        },
      )
    }
    if (formData.fuleOutput === "Anolage/Voltage" && formData.fuelStatus=="On") {
        fields.push(
          {
            label: "Tank Capacity",
            name: "tankCapacity",
            type: "text",
            placeholder: "Enter Fuel Tank Capacity",
            required: true,
            value: "",
    
          },
          {
            label: "Minimum Value",
            name: "minimumValue",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
    
          },
          {
            label: "Fill Difference",
            name: "fillDifference",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
    
          },
          {
            label: "Data Filtration Level",
            name: "dataFiltrationLevel",
            type: "text",
            placeholder: "10",
            required: true,
            value: "",
    
          },
          {
            label: "Maximum Value",
            name: "maximumValue",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value:"",
    
          },
          {
            label: "Drain Difference",
            name: "drainDifference",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
    
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
            value:"",
    
          },
          {
            label: "Fill Difference",
            name: "fillDifference",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
    
          },
          {
            label: "Data Filtration Level",
            name: "dataFiltrationLevel",
            type: "text",
            placeholder: "10",
            required: true,
            value: "",
    
          },
          {
            label: "Drain Difference",
            name: "drainDifference",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
    
          }
        );
      }
      return fields
};
