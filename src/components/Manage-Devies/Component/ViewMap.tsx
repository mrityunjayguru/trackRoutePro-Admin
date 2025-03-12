import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getmapDetails } from "../../../api/Map";
import { AppDispatch } from "../../../store/store";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import VehicleRecord from "./VehicleRecord";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_APP_MAP_KEY; // Ensure API Key is set

function ViewMap() {
  const dispatch = useDispatch<AppDispatch>();
  const devices = useSelector((state: any) => state.subscriber?.singleDevice);
  const maprecords = useSelector((state: any) => state?.map?.AllmapDetails || []);

  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default location
  const [zoom, setZoom] = useState(12);
  const [mapMode, setMapMode] = useState<any>("roadmap");

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Use environment variable for API Key
  });

  useEffect(() => {
    if (devices?.imei) {
      getMapRecord();
    }
  }, [devices]);

  useEffect(() => {
    if (maprecords.length > 0) {
      const firstRecord = maprecords[0]?.trackingData?.location;
      if (firstRecord?.latitude && firstRecord?.longitude) {
        setCenter({ lat: Number(firstRecord.latitude), lng: Number(firstRecord.longitude) });
        setZoom(15); // Auto zoom to focus on the latest location
      }
    }
  }, [maprecords]); // Runs when map data updates

  const getMapRecord = async () => {
    try {
      if (!devices?.imei) return;
      const payload: any = { deviceId: devices.imei };
      await dispatch(getmapDetails(payload));
    } catch (err) {
      console.error("Error fetching map details:", err);
    }
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    console.log("Map Loaded:", map);
  }, []);

  const handleMarkerClick = (location: { latitude: number; longitude: number }) => {
    setCenter({ lat: location.latitude, lng: location.longitude });
    setZoom(16);
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <>
      <VehicleRecord />

      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        options={{
          gestureHandling: "greedy",
          disableDefaultUI: false,
          mapTypeControl: true,
          streetViewControl: true,
          mapTypeId: mapMode,
          fullscreenControl: true,
        }}
      >
        {maprecords.length > 0 &&
          maprecords.map((val: any, index: number) => {
            const location = val?.trackingData?.location;
            const iconUrl = `${import.meta.env.VITE_APP_Image_Url}${val?.vehicletype?.icons}`;

            return location ? (
              <Marker
                key={index}
                position={{
                  lat: Number(location.latitude),
                  lng: Number(location.longitude),
                }}
                icon={{
                  url: iconUrl,
                  scaledSize: new window.google.maps.Size(30, 30),
                  anchor: new window.google.maps.Point(15, 15),
                  rotation: 90,
                }}
                onClick={() => handleMarkerClick(location)}
              />
            ) : null;
          })}
      </GoogleMap>
    </>
  );
}

export default ViewMap;
