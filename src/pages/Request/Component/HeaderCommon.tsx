import { useState } from "react";
import Request from "../Request";
import ReviwDevices from "./ReviwDevices";
import { useSelector } from "react-redux";

function HeaderCommon() {
  const [activeTab, setActiveTab] = useState("New subscriber"); // Default active tab
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  return (
    <>
      <div className="flex gap-5 px-5 my-1">
        <div
          onClick={() => setActiveTab("New subscriber")}
          className={`font-medium text-xl cursor-pointer relative transition-colors duration-300 ease-in-out ${
            activeTab === "New subscriber" ? "text-[#D9E821]" : "text-[#000000]"
          }`}
        >
          New subscriber
          {activeTab === "New subscriber" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D9E821] transition-all duration-300 ease-in-out"></div>
          )}
        </div>
        <div
          onClick={() => setActiveTab("new vehicle")}
          className={`font-medium text-xl cursor-pointer relative transition-colors duration-300 ease-in-out ${
            activeTab === "new vehicle" ? "text-[#D9E821]" : "text-[#000000]"
          }`}
        >
          New vehicle
          {activeTab === "new vehicle" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D9E821] transition-all duration-300 ease-in-out"></div>
          )}
        </div>
      </div>
      <div className="mt-3 border-b-2 border-[#D9E821]"></div>

{activeTab=="New subscriber" || loginUser.permissions?.Renew_Request?.view?(<>
<Request/>
</>):(
  <ReviwDevices/>
)}

    </>
  );
}

export default HeaderCommon;
