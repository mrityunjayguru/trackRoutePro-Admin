import React, { useRef } from "react";
import Logo from '../../../../images/logo/TrPro.png';
import { TrackRouteLogo } from "../../../../components/Sidebar/SideBarSvgIcons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoiceCard = ({ invoice }: { invoice: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const deviceType = invoice?.item?.deviceType ? "Wired" : "Wireless";
  const devicePrice = invoice?.item?.price || 0;
  const relayPrice = invoice?.item?.relayPrice || 0;
  const planPrice = invoice?.item?.internalPlanPrice || 0;
  const duration = parseInt(invoice?.item?.duration) || 1;

  const rawTotal = devicePrice + relayPrice + planPrice;
  const gst = parseFloat((rawTotal * 0.18).toFixed(2));
  const discount = parseFloat((rawTotal * 0.2).toFixed(2));
  const totalPayable = rawTotal + gst - discount;

  const downloadPDF = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save(`${invoice?.invoiceNo || "invoice"}.pdf`);
  };

  return (
    <div className="px-4 py-6">
      <div
        ref={cardRef}
        className="bg-white text-black mx-auto max-w-md p-6 border border-gray-300 rounded shadow-sm text-sm font-medium"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-lg font-bold mb-2">
            <TrackRouteLogo />
            <span>Brillovate Pvt. Ltd.</span>
          </div>
          <div className="text-xs text-gray-600 leading-snug">
            <p>E-1001, AIG PARK AVENUE, SECTOR-4</p>
            <p>GAUR CITY-1, GAUTAM BUDDHA NAGAR</p>
            <p>UTTAR PRADESH - 201318</p>
            <p>GSTIN/UIN: 09CZXPK0270J1ZS</p>
            <p>State Name: Uttar Pradesh, Code 09</p>

            <hr className="my-2 border-gray-200" />

            <p>Invoice No: {invoice?.invoiceNo || "N/A"}</p>
            <p>Operating Area: {invoice?.salesTeam?.operatingArea || "N/A"}</p>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="border-t border-gray-200 py-2 text-xs">
          <p>Invoice: {invoice?.invoiceNo || "TRAXXXXXXXX"}</p>
          <p>Date: {invoice?.date || "16 May 2025 (10:19 AM)"}</p>
          <p className="mt-1 font-semibold">Buyer: {invoice?.personalinfo?.fullName || "N/A"}</p>
          <p className="text-gray-600">
            Address: {invoice?.personalinfo?.district || ""}, {invoice?.personalinfo?.address || ""}
            <br />
            GSTIN: {invoice?.personalinfo?.gstNo || "N/A"}
            <br />
            Phone: {invoice?.personalinfo?.phone || "N/A"}
          </p>
        </div>

        {/* Bill Details */}
        <div className="border-t border-gray-200 py-2 text-xs">
          <h3 className="font-semibold mb-1 text-gray-700">Bill Details</h3>
          <div className="flex justify-between"><span>{deviceType} GPS Amount</span><span>₹ {devicePrice}</span></div>
          <div className="flex justify-between"><span>Anti Theft (Relay) Amount</span><span>₹ {relayPrice}</span></div>
          <div className="flex justify-between"><span>{duration} Year Subscription (W)</span><span>₹ {planPrice}</span></div>
          {deviceType === "Wireless" && (
            <div className="flex justify-between">
              <span>{duration} Year Subscription (WL)</span>
              <span>₹ {planPrice}</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 py-2 text-xs">
          <div className="flex justify-between"><span>Total</span><span>₹ {rawTotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>18% GST</span><span>₹ {gst.toFixed(2)}</span></div>
          <div className="flex justify-between text-green-600"><span>Discount Coupon (20%)</span><span>− ₹ {discount.toFixed(2)}</span></div>
        </div>

        {/* Total Payable */}
        <div className="border-t border-gray-300 pt-2 text-base font-bold flex justify-between">
          <span>Total Payable</span><span>₹ {totalPayable.toFixed(2)}</span>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-4">
        <button
          onClick={downloadPDF}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceCard;
