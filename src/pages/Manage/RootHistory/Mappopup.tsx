import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { RootHistorys } from "../../../api/Reports";

const arrowIcon = {
  url: "", // Arrow image
  scaledSize:window.google
  ? new window.google.maps.Size(30, 30): undefined,
  anchor: window.google
  ? new window.google.maps.Point(15, 15)
  : undefined, 
};

const Mappopup: React.FC<{ records: any; onClose: () => void }> = ({ records, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
if(records?.startTime || records?.First_Ignition){
  const payload: any = {
    imei: records?.imei,
    startdate:formatDateTime(records?.startTime || records?.First_Ignition),
    enddate:formatDateTime(records?.endTime || records?.Last_Ignition),
  };
   dispatch(RootHistorys(payload));
}
  },[records])
  const [startDate, setStartdate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const MapReports = useSelector(
    (state: any) => state?.userReport?.RootHistory || []
  );
  const imeiRecords = useSelector(
    (state: any) => state?.userReport?.singleRecordsImei
  );
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBaGHp3hW_TgoyCcbkuUogkIQqzolYdpmc",
  });

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getMapReports = async () => {
    try {
      const payload: any = {
        imei: imeiRecords?.imei,
        startdate: formatDate(new Date(startDate)),
        enddate: formatDate(new Date(endDate)),
      };
      await dispatch(RootHistorys(payload));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getMapReports();
  }, []);

  const pathCoordinates = MapReports?.map((vehicle: any) => ({
    lat: vehicle?.trackingData?.location?.latitude,
    lng: vehicle?.trackingData?.location?.longitude,
  }));
  const formatDateTime = (dateString: string ) => {
    const date = new Date(dateString);
  console.log(date.getUTCHours(),"hhhhhhhhhhh")
    return `${date.getFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")} ${String(date.getUTCHours())}:${String(date.getUTCMinutes())}`;
  };
  
  // Example Usage
  // Output: "2025-02-26 18:35"
  
  // Generate arrow markers based on path
  const arrowMarkers = pathCoordinates.map((point:any, index:any) => {
    if (index === 0) return null; // Skip the first point

    const prevPoint = pathCoordinates[index - 1];

    // Calculate angle for arrow rotation
    const angle =
      (Math.atan2(point.lng - prevPoint.lng, point.lat - prevPoint.lat) *
        180) /
      Math.PI;

    return (
      <Marker
        key={`arrow-${index}`}
        position={point}
        icon={{
          ...arrowIcon,
          rotation: angle,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-99999">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] h-[90%] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          X
        </button>
        <h1 className="text-center text-xl font-bold mb-4">
          Vehicles on Google Map
        </h1>
        <div className="flex gap-5 mb-4">
          <input
            onChange={(e) => setStartdate(e.target.value)}
            className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="date"
            placeholder="Select start Date"
          />
          <input
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="date"
            placeholder="Select end Date"
          />
          <button
            onClick={getMapReports}
            className="w-[200px] bg-blue-600 text-white py-2 rounded-lg font-medium transition"
          >
            Submit
          </button>
        </div>
        <div style={{ height: "80%", width: "100%" }}>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={pathCoordinates?.[0] || { lat: 28.183788, lng: 76.619042 }}
              zoom={13}
            >
              {MapReports?.map((vehicle: any, index: number) => (
                <Marker
                  key={index}
                  position={{
                    lat: vehicle.trackingData.location.latitude,
                    lng: vehicle.trackingData.location.longitude,
                  }}
                  title={vehicle.vehicletype.vehicleTypeName}
                />
              ))}

              {/* Polyline for the route */}
              {pathCoordinates.length > 1 && (
                <Polyline
                  path={pathCoordinates}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                  }}
                />
              )}

              {/* Render direction arrows */}
              {arrowMarkers}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mappopup;
