
export const formatDateToDDMMMYYYY = (dateInput:any) => {
    // Parse the date input into a Date object
    const date = new Date(dateInput);
  
    // Validate if the date is valid
    if (isNaN(date.getTime())) {
       return "-"
    }
  
    // Define an array of month names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Extract the day, month, and year
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${day} ${month} ${year}`;
  };
  

  
export const formatDateToDDMMMYYYYwithDate = (dateInput:any) => {
    // Parse the date input into a Date object
    const date = new Date(dateInput);
  
    // Validate if the date is valid
    if (isNaN(date.getTime())) {
       return "-"
    }
  
    // Define an array of month names
    const monthNames = [
      "1", "2", "3", "4", "5", "6",
      "7", "8", "9", "10", "11", "12"
    ];
  
    // Extract the day, month, and year
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${day}-${month}-${year}`;
  };
  

  export const formatDateToDDMMMYYYYwithTime = (dateInput:any) => {
  

    const date = new Date(dateInput);
    // Validate if the date is valid
    if (isNaN(date.getTime())) {
      return "-";
    }
    console.log(date,"dateInput")
    // Define an array of month names (as numbers)
    const monthNames = [
      "1", "2", "3", "4", "5", "6",
      "7", "8", "9", "10", "11", "12"
    ];
  
    // Extract the day, month, year, hours, and minutes
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    const hours = date.getHours().toString().padStart(2, "0"); // Ensures 2 digits
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensures 2 digits
  
    // Return the formatted date and time
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  



export const formatDateToYMDHM = (dateStr: any) => {
  if(!dateStr)
    return "NA"
  const date = new Date(dateStr); // FIX: 'new dateStr' is invalid

  // Subtract 5 hours and 30 minutes (330 minutes)
  date.setMinutes(date.getMinutes() - 330);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};


