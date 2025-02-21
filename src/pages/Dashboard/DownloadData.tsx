import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { dowonloadUser, downloadAdmin, downloadDelear, downloadDevices, deviceTypes, downloadInventry } from "../../api/DownloadDetail";

function DownloadData() {
  const dispatch = useDispatch<AppDispatch>();

  const buttonData = [
    { button: "Download User" },
    { button: "Download Admin" },
    { button: "Download Dealer" },
    { button: "Download Devices" },
    { button: "Download Device Type" },
    { button: "Download Inventory" },
  ];

  const handleDownload = async (item: string) => {
    const payload: any = {};
let responce:any;
    if (item === "Download User") {
        responce=await dispatch(dowonloadUser(payload));
    } else if (item === "Download Admin") {
        responce=await  dispatch(downloadAdmin(payload));
    } else if (item === "Download Dealer") {
        responce=await   dispatch(downloadDelear(payload));
    } else if (item === "Download Devices") {
        responce=await    dispatch(downloadDevices(payload));
    } else if (item === "Download Device Type") {
        responce=await   dispatch(deviceTypes(payload));
    } else if (item === "Download Inventory") {
        responce=await   dispatch(downloadInventry(payload));
    }
    if (responce.payload?.data?.data) {
        const fileUrl = `${import.meta.env.VITE_APP_Image_Url}${responce.payload.data.data}`; // Construct full URL
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = responce.payload.data.data.split("/").pop(); // Extract file name from URL
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error("Download failed: No file URL received");
      }


  };

  return (
    <div className="grid grid-cols-6 gap-2 w-full">
      {buttonData.map((item, index) => (
        <button
          key={index}
          className="px-5 bg-[#000000] mt-2 text-[#D9E821] py-2 rounded-normal font-medium transition"
          onClick={() => handleDownload(item.button)}
        >
          {item.button}
        </button>
      ))}
    </div>
  );
}

export default DownloadData;
