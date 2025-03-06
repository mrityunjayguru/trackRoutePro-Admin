import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { RootHistorys, RootHistorysSetBlank } from "../../../api/Reports";
import { RxCross2 } from "react-icons/rx";

const Mappopup: React.FC<{ records: any; onClose: () => void }> = ({ records, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  
  const MapReports = useSelector((state: any) => state?.userReport?.RootHistory || []);
  const imeiRecords = useSelector((state: any) => state?.userReport?.singleRecordsImei);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_MAP_KEY || "YOUR_API_KEY",
  });

  useEffect(() => {
    console.log(records,"recordsrecords")
    if (records?.imei && (records?.startTime || records?.First_Ignition)) {
      const payload:any = {
        imei: records.imei,
        startdate: formatDateTime(records.startTime  || records.Last_Ignition),
        enddate: formatDateTime(records.endTime || records.First_Ignition),
      };
      dispatch(RootHistorys(payload));
    }
  }, [records, dispatch]);
  useEffect(() => {
      const payload:any = []
      dispatch(RootHistorysSetBlank(payload));
  }, []);
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")} ${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
  };

  const fetchMapReports = async () => {
    if (!imeiRecords?.imei || !startDate || !endDate) return;

    const payload:any = {
      imei: imeiRecords.imei,
      startdate: startDate,
      enddate: endDate,
    };
    dispatch(RootHistorys(payload));
  };

  const pathCoordinates = MapReports?.map((vehicle: any) => ({
      lat: vehicle?.trackingData?.location?.latitude,
      lng: vehicle?.trackingData?.location?.longitude,
    }))
    .filter((point:any) => point.lat != null && point.lng != null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-99999">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] h-[90%] relative">
        <button onClick={onClose} className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded">
          <RxCross2 />
        </button>
        <h1 className="text-center text-xl font-bold mb-4">Vehicles on Google Map</h1>
        
        <div className="flex gap-5 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={fetchMapReports}
            className="w-[200px] bg-blue-600 text-white py-2 rounded-lg font-medium transition"
          >
            Submit
          </button>
        </div>

        <div style={{ height: "80%", width: "100%" }}>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={pathCoordinates[0] || { lat: 28.183788, lng: 76.619042 }}
              zoom={13}
            >
              {pathCoordinates?.map((point:any, index:any) => (
                <Marker key={`marker-${index}`} position={point}   
                // label={{
                //   text: (index + 1).toString(), 
                //   color: "white",
                //   fontWeight: "bold",
                //   fontSize: "12px",
                // }}
                />
              ))}

              {pathCoordinates.length > 1 && (
                <Polyline
                  path={pathCoordinates}
                  options={{ strokeColor: "#FF0000", strokeOpacity: 0.8, strokeWeight: 4 }}
                />
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mappopup;
