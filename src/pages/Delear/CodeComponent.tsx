import React from 'react';

// Define the type for SingleSubscriber
interface SingleSubscriber {
  uniqueCode: string | null; // uniqueCode should be a string or null
}

interface CodeComponentProps {
  SingleSubscriber: SingleSubscriber;
}

const CodeComponent: React.FC<CodeComponentProps> = ({ SingleSubscriber }) => {
  return (
    <>
      <div>
        <p className="text-[14px] font-normal text-[#9F9EA2]">Dealer code</p>
        <p className="text-sm font-semibold text-[#000000]">
          {SingleSubscriber?.uniqueCode || '-'} {/* Show '-' if uniqueCode is null or undefined */}
        </p>
      </div>
      <div className="border-b-2 border-[#D9E821]"></div>
    </>
  );
};

export default CodeComponent;
