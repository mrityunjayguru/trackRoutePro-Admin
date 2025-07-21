import React, { useRef } from "react";
import Logo from '../../../../images/logo/TrPro.png';
import { TrackRouteLogo } from "../../../../components/Sidebar/SideBarSvgIcons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import InvoiceGenerator from "./DownloadPdf";

const InvoiceCard = ({ invoice }: { invoice: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const deviceType = invoice?.item?.deviceType ? "Wired" : "Wireless";
  const deviceQuantity = invoice?.item?.quantity || 0;
  const relayQuentity=invoice?.item?.relayQuentity || 0;

  const devicePrice = (invoice?.item?.price || 0) * deviceQuantity;
  const relayPrice = (invoice?.item?.relayPrice || 0) * relayQuentity;
  const planPrice = (invoice?.item?.internalPlanPrice || 0) * deviceQuantity;
const durationMap: Record<number, number> = {
  1: 2,
  2: 3,
  3: 5,
};

const duration = durationMap[invoice?.item?.duration] || 1;


  const rawTotal = devicePrice + relayPrice + planPrice;
  console.log(rawTotal,"rawTotalrawTotal")
  const couponPercent = invoice?.couponDetail?.discountPercent || 0;
  const discount = parseFloat(((rawTotal * couponPercent) / 100).toFixed(2));
  console.log(discount,"discountdiscount")
  let managediscount=rawTotal-discount
  const gst = parseFloat((managediscount * 0.18).toFixed(2));
  const totalPayable = managediscount+ gst  ;

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
console.log(invoice,"lllllllllllllllll")
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
          </div>
            <span>Brillovate Pvt. Ltd.</span>
          <div className="text-xs text-gray-600 leading-snug">
            <p>GE AMBIKA AMBIKA</p>
            <p>SHIV BAGAN,NEAR RAJ BHA</p>
            <p>Ranchi G.P.O., Ranchi, Ranchi- 834001</p>
            <p>GSTIN/UIN: 20AANCB5092K1ZJ</p>
            <p>State Name: Jharkhand</p>

            <hr className="my-2 border-gray-200" />

            {/* <p>Invoice No: {invoice?.invoiceNo || "N/A"}</p> */}
            <p>Operating Area: {invoice?.salesTeam?.operatingArea || "N/A"}</p>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="border-t border-gray-200 py-1 text-xs">
          <p>Invoice: {invoice?.invoiceNo || "TRAXXXXXXXX"}</p>
{invoice?.imeiDetails?.map((val: any, index: number) => (
  <div key={val._id || index} className="text-xs text-gray-600 leading-snug ">
    <p className="py-1"><strong>IMEI No:</strong> {val.imeiNo}</p>
    <p className="py-1"><strong>SIM No:</strong> {val.simNo}</p>
    <p className="py-1"><strong>Devicetype:</strong> {val.isWired ? "Wired" : "Wireless"}</p>
  </div>
))}


           <div className=" mt-1">
          <span>Payment ID: </span><span>{ invoice?.paymentDetails?.razorpay_payment_id}</span>
        </div>
          <p>Date: {invoice?.orderedAt || "16 May 2025 (10:19 AM)"}</p>
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
          <div className="flex justify-between"><span> GPS device × {deviceQuantity}</span><span>₹ {devicePrice.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Anti Theft (Relay) Amount × {relayQuentity}</span><span>₹ {relayPrice.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>{duration} Year Subscription</span><span>₹ {planPrice.toFixed(2)}</span></div>
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 py-2 text-xs">
          <div className="flex justify-between"><span>Total</span><span>₹ {rawTotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>18% GST</span><span>₹ {gst.toFixed(2)}</span></div>
          <div className="flex justify-between text-green-600"><span>Discount Coupon {couponPercent}%</span><span>− ₹ {discount.toFixed(2)}</span></div>
        </div>

        {/* Total Payable */}
        <div className="border-t border-gray-300 pt-2 text-base font-bold flex justify-between">
          <span>Total Payable</span><span>₹ {totalPayable.toFixed(2)}</span>
        </div>
        
      </div>

<InvoiceGenerator invoice={invoice}/>
      {/* Download Button */}
      {/* <div className="text-center mt-4">
        <button
          onClick={downloadPDF}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
        >
          Download PDF
        </button>
      </div> */}
    </div>
  );
};

export default InvoiceCard;
