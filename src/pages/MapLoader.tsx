import { useJsApiLoader } from "@react-google-maps/api";
import { Outlet } from "react-router-dom"; // Outlet allows child components to render

const API_KEY = import.meta.env.VITE_APP_MAP_KEY;

const MapLoader = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places"], // Ensure same libraries everywhere
  });

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  console.log(isLoaded, "isLoaded");

  // Store `isLoaded` as a string ("true" or "false")
  localStorage.setItem("isLoaded", JSON.stringify(isLoaded));

  return <Outlet context={{ isLoaded }} />; // Pass isLoaded to all routes
};

export default MapLoader;
