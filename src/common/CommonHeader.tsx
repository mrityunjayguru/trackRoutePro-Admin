import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Define the type for propsData to improve type safety
interface PropsData {
  title: string;
  button?: string;
  redirect?: string;
  button2?: string;
  redirect2?: string;
  button3?: string;
}

interface CommonHeaderProps {
  propsData: PropsData;
  handledownload?: () => void;
}

function CommonHeader({ propsData, handledownload }: CommonHeaderProps) {
  const navigate = useNavigate();
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  // Descriptive event handler function name
  const handleCreateSubscriber = (redirect:any) => {
    if(redirect){
      navigate(`/${redirect}`);
    }
  };

 

  return (
  <>
    <div className="rounded-2xl flex justify-between gap-1 w-full px-4   font-semibold ">
      <h1 className="text-[#000000] cursor-pointer sm:text-xs md:text-xl ">
        {propsData.title}
      </h1>
    <div className="flex gap-2">
    {propsData.button?(<div onClick={()=>{handleCreateSubscriber(propsData.redirect)}} className="text-sm text-[#000000]  sm:py-1 px-10 md:py-2 flex justify-center items-center cursor-pointer bg-[#D9E821]">
          {propsData.button}
        </div>):(null)}
        {propsData.button2?(<div onClick={()=>{handleCreateSubscriber(propsData.redirect2)}} className="text-sm text-[#000000]  sm:py-1 px-10 md:py-2 flex justify-center items-center cursor-pointer bg-[#D9E821]">
          {propsData.button2}
        </div>):(null)}
        {propsData.button3?(<div onClick={handledownload} className="text-sm text-[#000000]  sm:py-1 px-10 md:py-2 flex justify-center items-center cursor-pointer bg-[#D9E821]">
          {propsData.button3}
        </div>):(null)}
    </div>
        
    </div>
    <div className="border-b-2 border-[#D9E821]"></div>
  </>
  );
}

export default CommonHeader;
