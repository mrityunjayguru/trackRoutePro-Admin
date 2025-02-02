import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setZomm } from "../../../store/manageMap";

const API_KEY = import.meta.env.VITE_APP_MAP_KEY;

const Maps: React.FC = () => {
  const maprecords = useSelector((state: any) => state.map.AllmapDetails);
  const autoZoom: any = useSelector((state: any) => state.map.autoZoom);
  const [mapMode, setMapmode] = useState<any>("roadmap");
  const dispatch = useDispatch();

  const [zoom, setZoom] = useState<number>(5);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 20.5937,
    lng: 78.9629,
  });

  const [rotation, setRotation] = useState<number>(0); // Rotation state for image
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const imageUrl =
    "https://trackroute.s3.ap-south-1.amazonaws.com/28173806205862458_27173800899358233_car-icon.png"; // Car icon image URL

  useEffect(() => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context && imageRef.current) {
        const image = imageRef.current;

        // Clear the canvas before redrawing the image
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the center of the canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Translate the context to the center of the canvas
        context.translate(centerX, centerY);

        // Rotate the canvas context by the current rotation angle
        context.rotate((rotation * Math.PI) / 180); // Convert degrees to radians

        // Draw the image centered on the canvas
        context.drawImage(
          image,
          -image.width / 2, // Align image to the center
          -image.height / 2, // Align image to the center
          image.width,
          image.height
        );

        // Reset transformation after drawing
        context.resetTransform();
      }
    }
  }, [rotation]); // Re-run effect when rotation state changes

  const rotateImage = (angle: number) => {
    setRotation((prevRotation) => prevRotation + angle); // Update the rotation state
  };

  const handleZoomIn = (location: { latitude: number; longitude: number }) => {
    setZoom(15);
    setCenter({ lat: Number(location.latitude), lng: Number(location.longitude) });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    google.maps.event.addListener(map, "maptypeid_changed", () => {
      const currentMapType = map.getMapTypeId();
      setMapmode(currentMapType);
    });

    google.maps.event.addListener(map, "streetview_changed", () => {
      const streetView = map.getStreetView();
      if (streetView.getVisible()) {
        console.log("Street View is now enabled!");
      } else {
        console.log("Street View is now disabled!");
      }
    });
  };

  const onZoomChanged = async () => {
    setTimeout(() => {
      dispatch(setZomm(false));
    }, 1000);

    if (mapRef.current) {
      setZoom(mapRef.current.getZoom()!);
    }
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        Loading Map...
      </div>
    );
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        onZoomChanged={onZoomChanged}
        options={{
          gestureHandling: "greedy",
          disableDefaultUI: false,
          mapTypeControl: true,
          streetViewControl: true,
          mapTypeId: mapMode,
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: google?.maps?.ControlPosition?.LEFT_TOP, // Set position to the right
          },
        }}
      >
        {maprecords?.length > 0 ? (
          maprecords.map((val: any, index: number) => {
            const location = val?.trackingData?.location;
            const iconUrl = canvasRef.current ? canvasRef.current.toDataURL() : "";

            return location ? (
              <Marker
                key={index}
                position={{
                  lat: Number(location.latitude),
                  lng: Number(location.longitude),
                }}
                icon={{
                  url: iconUrl,
                  scaledSize: window.google
                    ? new window.google.maps.Size(30, 30)
                    : undefined,
                  anchor: window.google
                    ? new window.google.maps.Point(15, 15)
                    : undefined,
                  rotation: rotation,
                }}
                onClick={() => handleZoomIn(location)}
              />
            ) : null;
          })
        ) : (
          <Marker
            position={{ lat: 37.7749, lng: -122.4194 }} // Default marker position
          />
        )}
      </GoogleMap>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Rotate Car Icon</h2>
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Car Icon"
          style={{ display: "none" }}
        />

        <canvas
          ref={canvasRef}
          width={40}
          height={40}
          style={{ display: "none" }}
        ></canvas>

        <div style={{ marginTop: "20px" }}>
          <button onClick={() => rotateImage(90)}>Rotate 90°</button>
          <button onClick={() => rotateImage(-90)}>Rotate -90°</button>
          <button onClick={() => setRotation(0)}>Reset Rotation</button>
        </div>
      </div>
    </div>
  );
};

export default Maps;
