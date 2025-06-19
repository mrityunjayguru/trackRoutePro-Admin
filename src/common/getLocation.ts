import axios from 'axios';

export const getAddressFromCoords = async (lat: number, lng: number) => {
  const apiKey = 'AIzaSyAhT2p2a9U5s9I_Tzmi8ilRMF37CxXz7pU'; // ✅ Google Maps key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK" && response.data.results.length > 0) {
      const formattedAddress = response.data.results[0].formatted_address;
      console.log("Address:", formattedAddress);
      return formattedAddress;
    } else {
      console.error("No address found or bad response:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};
