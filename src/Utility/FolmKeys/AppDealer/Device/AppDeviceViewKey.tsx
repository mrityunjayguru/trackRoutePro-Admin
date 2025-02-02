import { useSelector } from "react-redux";

export const AppDeviceViewKey = (SingleDevice: any, VehiclwType: any,devicetypeDetails:any,DealerRecord:any) => {
    
    const getKeysWithTrueValues = (obj: any): string[] => {
        let myval = Object.entries(obj)
            .filter(([key, value]) => value === true) // Filter keys where value is true
            .map(([key]) => key); // Return the key as it is without modification

        return myval;
    };

    // Ensure the displayParameters exists and is populated before processing
    const displayParams = SingleDevice?.displayParameters || {};
    console.log("Display Parameters:", displayParams);

    // Get the keys with true values
    const trueKeys = getKeysWithTrueValues(displayParams);
    const DeviceType: any = devicetypeDetails?.map((vehicle: any) => ({
        label: vehicle.deviceType,
        value: vehicle._id,
      }));
    const formData:any = useSelector((state: any) => state?.subscriber?.formData);
    const fields:any= [
        {
            label: 'Device Type *',
            name: 'deviceType',
            type: 'select',
            placeholder: 'Choose Device',
            options: DeviceType,
            value: SingleDevice?.deviceTypeDetail?.deviceType,
            disabled:true,

        },

        {
            label: 'IMEI No. *',
            name: 'imei',
            type: 'text',
            placeholder: 'Enter IMEI No.',
            value:SingleDevice?.deviceTypeDetail?.imeiNo,
            disabled:true,
        },
        {
          label: 'vehicle Number *',
          name: 'vehicleNo',
          type: 'text',
          placeholder: 'Enter Device vehicle No.',
          value: SingleDevice.vehicleNo, // Dummy value
          disabled:true,

        },
        {
            label: 'Device SIM No. *',
            name: 'deviceSimNumber',
            type: 'text',
            placeholder: 'Enter Device Mobile No.',
            value: SingleDevice?.deviceSimNumber,
            disabled:true,

        },
        {
            label: 'Operator',
            name: 'operator',
            type: 'select',
            placeholder: 'Choose Operator',
            options: ['Airtel', 'Jio', 'Vodafone', 'Other'],
            value: SingleDevice?.operator,
            disabled:true,

        },
        {
            label: 'Vehicle Category *',
            name: 'vehicleType',
            type: 'select',
            placeholder: 'Select Vehicle Type',
            options: VehiclwType,
            value: SingleDevice?.vehicleType,
            disabled:true,

        },
        {
            label: 'Device Status *',
            name: 'deviceStatus',
            type: 'select',
            placeholder: 'Choose Status',
            options: ['Active', 'InActive'],
            value: SingleDevice?.status,
            disabled:true,

        },
        {
            label: 'Device ID',
            name: 'deviceId',
            type: 'text',
            placeholder: 'Enter Device ID',
            value: SingleDevice?.deviceTypeDetail?.deviceId,
            disabled:true,

        },
        {
            label: 'Display Parameters *',
            name: 'displayParameters',
            type: 'checkboxGroup',
            disabled:true,
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
            disabled:true,

        },
      
    ];
           
    if(formData.fuleOutput=="On"){
      fields.push(  {
        label: 'Output *',
        name: 'fuleOutput',
        type: 'select',
        placeholder: 'Select Fuel System',
        options: ['Anolage/Voltage', 'Anolage/Ble', 'Anolage/Device'], // Example options
        value: SingleDevice?.fuleOutput,
        disabled:true,

    })
    }
    if (formData.fuleOutput === "Anolage/Voltage") {
        fields.push(
          {
            label: "Tank Capacity",
            name: "tankCapacity",
            type: "text",
            placeholder: "Enter Fuel Tank Capacity",
            required: true,
            value: "",
            disabled:true,

    
          },
          {
            label: "Minimum Value",
            name: "minimumValue",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
            disabled:true,

    
          },
          {
            label: "Fill Difference",
            name: "fillDifference",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
            disabled:true,
    
          },
          {
            label: "Data Filtration Level",
            name: "dataFiltrationLevel",
            type: "text",
            placeholder: "10",
            required: true,
            value: "",
            disabled:true,
    
          },
          {
            label: "Maximum Value",
            name: "maximumValue",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value:"",
            disabled:true,
    
          },
          {
            label: "Drain Difference",
            name: "drainDifference",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
            disabled:true,
    
          }
        );
      }
    
      if (formData.fuleOutput === "Anolage/Ble") {
        fields.push(
          {
            label: "Tank Capacity",
            name: "tankCapacity",
            type: "text",
            placeholder: "Enter Fuel Tank Capacity",
            required: true,
            value:"",
            disabled:true,
    
          },
          {
            label: "Fill Difference",
            name: "fillDifference",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
            disabled:true,
    
          },
          {
            label: "Data Filtration Level",
            name: "dataFiltrationLevel",
            type: "text",
            placeholder: "10",
            required: true,
            value: "",
            disabled:true,
    
          },
          {
            label: "Drain Difference",
            name: "drainDifference",
            type: "text",
            placeholder: "Enter Value",
            required: true,
            value: "",
            disabled:true,
    
          }
        );
      }
      return fields
};
