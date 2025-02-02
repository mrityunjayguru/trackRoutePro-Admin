import { useState } from "react";

function HeaderCommon() {
  const [activeTab, setActiveTab] = useState("Add New"); // Default active tab

  return (
    <>
      <div className="flex gap-5">
        <div
          onClick={() => setActiveTab("Add New")}
          className={`font-medium text-xl cursor-pointer relative transition-colors duration-300 ease-in-out ${
            activeTab === "Add New" ? "text-[#D9E821]" : "text-[#000000]"
          }`}
        >
          Add New
          {activeTab === "Add New" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D9E821] transition-all duration-300 ease-in-out"></div>
          )}
        </div>
        <div
          onClick={() => setActiveTab("Review")}
          className={`font-medium text-xl cursor-pointer relative transition-colors duration-300 ease-in-out ${
            activeTab === "Review" ? "text-[#D9E821]" : "text-[#000000]"
          }`}
        >
          Review
          {activeTab === "Review" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D9E821] transition-all duration-300 ease-in-out"></div>
          )}
        </div>
      </div>
      <div className="mt-3 border-b-2 border-[#D9E821]"></div>

    </>
  );
}

export default HeaderCommon;
