import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SummaryFilter from './SelectHeaders';
import CommonTable from '../../../common/Table/CommonTable';
import { usertableKeys } from '../../ManageUsers/Component/Subscriber/userTableKey';
import { travelSummarykey } from './travelSummarykey';
import { consolidateSummaryKeys } from './consolidateSummary';
import { tripSummaryKeys } from './tripSummaryKeys';
import { AlertsRecords, EventReportKey, stopAndIdelKeys } from './EventReportKey';
import { distanceReportKeys, distanceReportKeysss } from './distanceReportKeys';
import Mappopup from '../../Manage/RootHistory/Mappopup';
function ReportRecord() {
  const [currentPage, setCurrentPage] = useState(1);
  const [open,setOpen]=useState(false)
  const [val,setVal]=useState<any>(null)
  const imeiRecords = useSelector(
    (state: any) => state?.userReport?.reportType,
  );
  const traivelSummary = useSelector(
    (state: any) => state?.userReport?.traivelSummary|| [],
  );
  const distanceRecord = useSelector(
    (state: any) => state?.userReport?.distanceRecord|| [],
  );
  const handleRowClick = (val:any) => {
    if(imeiRecords.name == 'Travel Report' || imeiRecords.name == 'Trip Report' || imeiRecords.name == 'Summary'   ){
      setVal(val)
      setOpen(true)
    }
  };
  const handleonclose = () => {
    setOpen(false)
  };
  return (
    <div className='p-5'>
      {open?(<Mappopup text="Vehicle Report" showheader={false} records={val} onClose={handleonclose }/>):(null)}
      <SummaryFilter />
{traivelSummary && traivelSummary?.length>0?(<>
  <div className="my-5">
        {imeiRecords.name == 'Summary' ? (
          <CommonTable
            columns={consolidateSummaryKeys}
            data={traivelSummary}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
        ) : null}
      </div>
      <div className="my-5">
        {imeiRecords.name == 'Travel Report' ? (
          <CommonTable
            columns={travelSummarykey}
            data={traivelSummary}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
        ) : null}
      </div>
      <div className="my-5">
        {imeiRecords.name == 'Trip Report' ? (
          <CommonTable
            columns={tripSummaryKeys}
            data={traivelSummary}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
        ) : null}
      </div>
      <div className="my-5">
        {imeiRecords.name == 'Events Report' ? (
          <CommonTable
            columns={EventReportKey}
            data={traivelSummary}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
        ) : null}
      </div>
      <div className="my-5">
        {imeiRecords.name == 'Distance Report' ? (
        <>
          <CommonTable
            columns={distanceReportKeys}
            data={traivelSummary}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
            <CommonTable
            columns={distanceReportKeysss}
            data={distanceRecord}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
        </>
        ) : null}
      </div>
      <div className="my-5">
        {imeiRecords.name == 'Stop Idle Report' ? (
          <CommonTable
            columns={stopAndIdelKeys}
            data={traivelSummary}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
        ) : null}
      </div>
</>):(null)}
<div className="my-5">
        {imeiRecords.name == 'Alerts Report' ? (
          <CommonTable
            columns={AlertsRecords}
            data={traivelSummary}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
        ) : null}
      </div>

    </div>
  );
}

export default ReportRecord;
