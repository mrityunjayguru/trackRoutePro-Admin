import React, { useState } from 'react';

// Dropdown Component (Child)
// This component displays a dropdown and passes the selected value and label to its parent.
 const Dropdown = ({ options, valueKey, labelKey, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');

  // Handle change event when a new option is selected
  const handleChange = (event) => {
    const value = event.target.value;
    // Find the selected option object to get its label
    const selectedOption = options.find(option => option[valueKey] === value);
    const label = selectedOption ? selectedOption[labelKey] : '';

    setSelectedValue(value);
    setSelectedLabel(label);

    // Pass the selected value and label to the parent component via the onSelect prop
    if (onSelect) {
      onSelect({ value, label });
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="custom-dropdown" className="block text-gray-700 text-sm font-bold mb-2">
        Select an Option:
      </label>
      <select
        id="custom-dropdown"
        value={selectedValue}
        onChange={handleChange}
        className="block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm appearance-none pr-8 cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath fill='%236B7280' d='M10 12l-4-4 1.5-1.5L10 9l2.5-2.5L14 8l-4 4z'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
      >
        <option value="" disabled>-- Choose an option --</option>
        {options.map((option, index) => (
          <option key={index} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};



export default Dropdown;
