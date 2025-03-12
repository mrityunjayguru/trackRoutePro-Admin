import { useState } from "react";
import Request from "../Request";
import ReviwDevices from "./ReviwDevices";

function HeaderCommon() {
  const [activeTab, setActiveTab] = useState("New Subscriber"); // Default active tab
  return (
    <>
      <div className="flex gap-5">
        <div
          onClick={() => setActiveTab("New Subscriber")}
          className={`font-medium text-xl cursor-pointer relative transition-colors duration-300 ease-in-out ${
            activeTab === "New Subscriber" ? "text-[#D9E821]" : "text-[#000000]"
          }`}
        >
          New Subscriber
          {activeTab === "New Subscriber" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D9E821] transition-all duration-300 ease-in-out"></div>
          )}
        </div>
        <div
          onClick={() => setActiveTab("New Device")}
          className={`font-medium text-xl cursor-pointer relative transition-colors duration-300 ease-in-out ${
            activeTab === "New Device" ? "text-[#D9E821]" : "text-[#000000]"
          }`}
        >
          New Device
          {activeTab === "New Device" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D9E821] transition-all duration-300 ease-in-out"></div>
          )}
        </div>
      </div>
      <div className="mt-3 border-b-2 border-[#D9E821]"></div>

{activeTab=="New Subscriber"?(<>
<Request/>
</>):(
  <ReviwDevices/>
)}

    </>
  );
}

export default HeaderCommon;
