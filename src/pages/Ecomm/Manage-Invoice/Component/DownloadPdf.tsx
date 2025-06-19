import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';
import TrackRouteLogoSrc from '../../../../images/logo/TrPro.png';
import { TrackRouteLogo } from '../../../../components/Sidebar/SideBarSvgIcons';
import { LiaRupeeSignSolid } from "react-icons/lia";
// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  invoiceTitle: {
    fontSize: 30,
    color: '#333',
  },
  companyInfo: {
    marginBottom: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#555',
  },
  hr: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
    marginVertical: 20,
  },
  invoiceDetails: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#555',
  },
  itemsSection: {
    marginTop: 10,
  },
  itemsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    marginBottom: 5,
  },
  discountText: {
    color: 'green',
    fontSize: 12,
  },
  totalPayableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalPayableText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  summarySection: {
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 12,
    color: '#555',
  },
  totalSection: {
    borderTopWidth: 2,
    borderTopColor: '#000',
    marginTop: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

// PDF Document
const MyDocument = ({ invoice }) => {
  const companyName = "Brillovate Private Limited";
  const companyAddress =
    "GE AMBIKA AMBIKA, SHIV BAGAN,NEAR RAJ BHA, Ranchi G.P.O., Ranchi, Ranchi- 834001, Jharkhand";
  const companyGSTIN = "20AANCB5092K1ZJ";
  const companyStateName = "Jharkhand";
  const companyStateCode = "09";
  const relayQuentity=invoice?.item?.relayQuentity || 0;

  const invoiceNumber = invoice?.invoiceNo;
  const invoiceDate = invoice?.orderedAt;
  const buyerName = invoice?.personalinfo?.fullName;
  const buyerAddress = invoice?.personalinfo?.address;
  const buyerState = invoice?.personalinfo?.state;
  const buyerGST = invoice?.personalinfo?.gstNo;
  const buyerEmail = invoice?.personalinfo?.email;
  const buyerPhone = invoice?.personalinfo?.phone;

  const deviceType = invoice?.item?.deviceType ? "Wired" : "Wireless";
  const deviceQuantity = invoice?.item?.quantity || 0;

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
  const couponPercent = invoice?.couponDetail?.discountPercent || 0;
  const discount = parseFloat(((rawTotal * couponPercent) / 100).toFixed(2));
  let managediscount=rawTotal-discount
  const gst = parseFloat((managediscount * 0.18).toFixed(2));
  const totalPayable = managediscount+ gst ;


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {/* <Image src={TrackRouteLogoSrc} style={styles.logo} /> */}
          <TrackRouteLogo />
            
            <Text>
              TrackRoute
              <Text style={{ fontSize: 8, top: -3, position: 'absolute' }}>PRO</Text>
            </Text>
          </View>
          <Text style={styles.invoiceTitle}>Invoice</Text>
        </View>

        {/* Company Info */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.companyAddress}>{companyAddress}</Text>
          <Text style={styles.companyAddress}>GSTIN/UIN: {companyGSTIN}</Text>
          {/* <Text style={styles.companyAddress}>
            State Name: {companyStateName}, Code {companyStateCode}
          </Text> */}
        </View>

        <View style={styles.hr} />

        {/* Buyer Info */}
        <View style={styles.invoiceDetails}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Invoice No:</Text> {invoiceNumber}
          </Text>
           <Text>
            <Text style={{ fontWeight: 'bold' }}>Payment ID::</Text> {invoice?.paymentDetails?.razorpay_payment_id}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Date:</Text> {invoiceDate}
          </Text>
          <Text style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Buyer:</Text> {buyerName}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Address:</Text> {buyerAddress}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>State:</Text> {buyerState}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>GST:</Text> {buyerGST}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text> {buyerEmail}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Phone:</Text> {buyerPhone}
          </Text>
          
        </View>

        <View style={styles.hr} />

        {/* Items */}
        <View style={styles.itemsSection}>
          <Text style={styles.itemsHeader}>Items:</Text>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Bill Details</Text>
            <View style={styles.row}>
              <Text>{deviceType ? 'Wired' : 'Wireless'} GPS × {deviceQuantity}</Text>
              <Text> {devicePrice.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Anti Theft Relay × {relayQuentity}</Text>
              <Text> {relayPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>{duration} Year Plan</Text>
              <Text> {planPrice.toFixed(2)}</Text>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Text>Subtotal</Text>
              <Text> {rawTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>18% GST</Text>
              <Text> {gst.toFixed(2)}</Text>
            </View>
            {couponPercent > 0 && (
              <View style={styles.row}>
                <Text style={styles.discountText}>Discount Coupon {couponPercent}%</Text>
                <Text style={styles.discountText}>−  {discount.toFixed(2)}</Text>
              </View>
            )}
          </View>

          {/* Total */}
          <View style={styles.totalPayableRow}>
            <Text style={styles.totalPayableText}>Total Payable</Text>
            <Text style={styles.totalPayableText}> {totalPayable.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.hr} />

        {/* GST Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text>GST (18%)</Text>
            <Text>{gst.toFixed(2)}</Text>
          </View>
        </View>

        {/* Final Total */}
        <View style={styles.totalSection}>
          <Text>Total Paid</Text>
         <Text><Text></Text>{totalPayable.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Button Component
const InvoiceGenerator = ({ invoice }) => (
  <div>
    <PDFDownloadLink
      className="flex justify-center items-center py-5"
      document={<MyDocument invoice={invoice} />}
      fileName={`${invoice?.invoiceNo || 'invoice'}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          'Loading document...'
        ) : (
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Download PDF
          </button>
        )
      }
    </PDFDownloadLink>
  </div>
);

export default InvoiceGenerator;
