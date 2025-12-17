import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { TrackRouteLogo } from '../../../../components/Sidebar/SideBarSvgIcons';
import { formatDateToYMDHM } from '../../../../common/ManageDate';

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
  imeiBlock: {
    marginTop: 8,
    paddingBottom: 4,
  },
  imeiLine: {
    fontSize: 12,
    color: '#333',
  },
  imeiBold: {
    fontWeight: 'bold',
  },
});

const MyDocument = ({ invoice }) => {
  const companyName = "Brillovate Private Limited";
  const companyAddress =
    "GE AMBIKA AMBIKA, SHIV BAGAN,NEAR RAJ BHA, Ranchi G.P.O., Ranchi-834001, Jharkhand";
  const companyGSTIN = "20AANCB5092K1ZJ";
  const relayQuantity = invoice?.item?.relayQuentity || 0;
  const invoiceNumber = invoice?.invoiceNo;
  const invoiceDate = formatDateToYMDHM(invoice?.orderedAt);
  const buyer = invoice?.personalinfo || {};
  const deviceType = invoice?.item?.deviceType ? "Wired" : "Wireless";
  const deviceQuantity = invoice?.item?.quantity || 0;
  const devicePrice = (invoice?.item?.price || 0) * deviceQuantity;
  const relayPrice = (invoice?.item?.relayPrice || 0) * relayQuantity;
  const planPrice = (invoice?.item?.internalPlanPrice || 0) * deviceQuantity;
  const durationMap = { 1: 2, 2: 3, 3: 5 };
  const duration = durationMap[invoice?.item?.duration] || 1;
  const rawTotal = devicePrice + relayPrice + planPrice;
  const couponPercent = invoice?.couponDetail?.discountPercent || 0;
  const discount = parseFloat(((rawTotal * couponPercent) / 100).toFixed(2));
  const managedDiscount = rawTotal - discount;
  const gst = parseFloat((managedDiscount * 0.18).toFixed(2));
  const totalPayable = managedDiscount + gst;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <TrackRouteLogo />
            <Text>TrackRoute</Text>
          </View>
          <Text style={styles.invoiceTitle}>Invoice</Text>
        </View>

        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.companyAddress}>{companyAddress}</Text>
          <Text style={styles.companyAddress}>GSTIN/UIN: {companyGSTIN}</Text>
        </View>

        <View style={styles.hr} />

        <View style={styles.invoiceDetails}>
          <Text>
            <Text style={styles.imeiBold}>Invoice No:</Text> {invoiceNumber}
          </Text>

          {invoice?.imeiDetails?.map((val, index) => (
            <View key={val._id || index} style={styles.imeiBlock}>
              <Text style={styles.imeiLine}>
                <Text style={styles.imeiBold}>IMEI No:</Text> {val.imeiNo}
              </Text>
              <Text style={styles.imeiLine}>
                <Text style={styles.imeiBold}>SIM No:</Text> {val.simNo}
              </Text>
              <Text style={styles.imeiLine}>
                <Text style={styles.imeiBold}>Device Type:</Text> {val.isWired ? 'Wired' : 'Wireless'}
              </Text>
            </View>
          ))}

          <Text>
            <Text style={styles.imeiBold}>Payment ID:</Text> {invoice?.paymentDetails?.razorpay_payment_id}
          </Text>
          <Text>
            <Text style={styles.imeiBold}>Date:</Text> {invoiceDate}
          </Text>
          <Text>
            <Text style={styles.imeiBold}>Buyer:</Text> {buyer.fullName}
          </Text>
          <Text>
            <Text style={styles.imeiBold}>Address:</Text> {buyer.address}
          </Text>
          <Text>
            <Text style={styles.imeiBold}>State:</Text> {buyer.state}
          </Text>
          <Text>
            <Text style={styles.imeiBold}>GST:</Text> {buyer.gstNo}
          </Text>
          <Text>
            <Text style={styles.imeiBold}>Email:</Text> {buyer.email}
          </Text>
          <Text>
            <Text style={styles.imeiBold}>Phone:</Text> {buyer.phone}
          </Text>
        </View>

        <View style={styles.hr} />

        <View style={styles.itemsSection}>
          <Text style={styles.itemsHeader}>Items:</Text>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Bill Details</Text>
            <View style={styles.row}>
              <Text>GPS device × {deviceQuantity}</Text>
              <Text>{devicePrice.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Anti Theft Relay × {relayQuantity}</Text>
              <Text>{relayPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>{duration} Year Plan</Text>
              <Text>{planPrice.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text>Subtotal</Text>
              <Text>{rawTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>18% GST</Text>
              <Text>{gst.toFixed(2)}</Text>
            </View>
            {couponPercent > 0 && (
              <View style={styles.row}>
                <Text style={styles.discountText}>Discount Coupon {couponPercent}%</Text>
                <Text style={styles.discountText}>- {discount.toFixed(2)}</Text>
              </View>
            )}
          </View>

          <View style={styles.totalPayableRow}>
            <Text style={styles.totalPayableText}>Total Payable</Text>
            <Text style={styles.totalPayableText}>{totalPayable.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.hr} />

        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text>GST (18%)</Text>
            <Text>{gst.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text>Total Paid</Text>
          <Text>{totalPayable.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

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
