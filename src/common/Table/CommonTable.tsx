import React, { useState, useEffect, useCallback } from 'react';
import { FaEye } from 'react-icons/fa';
import { formatDateToDDMMMYYYY } from '../ManageDate';
import { ManageNestedKey } from './DynamicKey';
import CountdownTimer from '../CountdownTimer';

interface Column {
  key: string; // Key used in data
  label: string; // Display name for the column
}

interface TableProps {
  columns: Record<string, string>; // Column headers as an object
  data: any[]; // Data to display in the table
  onRowClick?: (rowData: any) => void; // Optional row click handler
  currentPage: any;
}

const CommonTable: React.FC<TableProps> = ({
  columns,
  data,
  currentPage,
  onRowClick,
}) => {
  const [sortedData, setSortedData] = useState<any[]>([]); // Set the sorted data
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc',
  });

  // Set the sorted data whenever the data prop changes
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const getVal = useCallback((colKey: string, val: any, data: any) => {
    if (colKey === 'updatedAt') {
      return formatDateToDDMMMYYYY(val);
    }
    
    if (colKey === 'phonenumber') {
      return data?.phone;
    }
    if (colKey === 'topic') {
      return data?.topic?.title;
    }
    if (colKey === 'User') {
      if (data.sendTo === 'Selected') {
        // Joining names from the result array into a single string
        return data.result
          .slice(0, 5)
          .map((val: any) => val.name)
          .join(', ');
      }
      return ''; // Return empty string if sendTo is not "Selected"
    }
    if (colKey === 'createdAt') {
      return formatDateToDDMMMYYYY(val);
    }
    if (colKey === 'userNames') {
      return data?.ownerIDDetail?.Name;
    }
    if(colKey=="createdDelearCode"){
    return  data?.dealerdetail[0]?.uniqueCode;
    }
    if (colKey == 'isOnlines') {
      if (data?.isOnline == true) {
        return 'Online';
      } else {
        return 'Retail';
      }
    } else if (colKey === 'createdDealerRecord') {
      return val?.uniqueCode || 'N/A';
    } else if (colKey === 'isWireds') {
      return data?.isWired ? 'Wire' : 'Wireless';
    } else if (colKey === 'userName') {
      return data?.users?.Name || '-';
    } else if (colKey === 'useremailAddress') {
      return data?.users?.emailAddress || '-';
    } else if (colKey === 'SimNo') {
      return data?.userDevices?.deviceSimNumber || '-';
    } else if (colKey === 'title') {
      return data?.notificationalert?.notification.title || '-';
    } else if (colKey === 'message') {
      return data?.notificationalert?.notification.body || '-';
    } else if (colKey === 'test') {
      return data?.notificationalert?.notification.title || '-';
    } else if (colKey === 'deviceType') {
      return val?.deviceType ? val.deviceType : val || 'N/A';
    } else if (colKey == 'Assignedon') {
      return formatDateToDDMMMYYYY(data?.userDevices?.createdAt);
    } else if (colKey == 'vehiclenos') {
      return data?.deviceDetail?.vehicleNo;
    } else if (colKey === 'timeRemaning') {
      return <CountdownTimer createdAt={data?.createdAt} />;
    } else if (colKey === 'owneriddetail') {
      return data?.userDevices?.owneriddetail?.uniqueCode || '-';
    } else if (colKey === 'Assignedto') {
      return data?.userDevices?.owneriddetail?.uniqueCode || '-';
    } else if (colKey === 'DealerCode') {
      return data?.userDevices?.dealerCode?.uniqueCode || '-';
    } else if (colKey === 'address') {
      return `${data.state}, ${data.city}`;
    } else if (colKey === 'assignStatus') {
      if (data?.userDevices?.createdAt) {
        return 'Assigned';
      } else {
        return 'Unassigned';
      }
    } else {
      return val;
    }
  }, []);

  // Handle sorting by a column
  const handleSort = (columnKey: string) => {
    const direction: 'asc' | 'desc' =
      sortConfig.key === columnKey && sortConfig.direction === 'asc'
        ? 'desc'
        : 'asc';

    const sorted = [...data].sort((a, b) => {
      const aValue = a[columnKey];
      const bValue = b[columnKey];

      // If both values are strings, perform case-insensitive comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
          : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
      }
      // For non-string values, fallback to normal comparison
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key: columnKey, direction });
  };
  // Render sorting indicator (arrow) in the header
  const getSortIndicator = (columnKey: string) => {
    return sortConfig.key === columnKey
      ? sortConfig.direction === 'asc'
        ? '↑'
        : '↓'
      : '';
  };
  return (
    <div className="table-container overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#EDEDED] w-full text-gray-700 font-semibold text-base">
          <tr>
            <th className="p-1 text-[#949495] text-sm cursor-pointer">#No.</th>
            {Object.entries(columns).map(([key, label]) => (
              <th
                key={key}
                className="p-1  text-center text-[#949495] text-sm cursor-pointer"
                onClick={() => handleSort(key)} // Use key for sorting
              >
                {label} {getSortIndicator(key)}
              </th>
            ))}
            <th className="p-1 text-[#949495] text-sm cursor-pointer">
              Manage
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData?.length > 0 ? (
            sortedData?.map((row: any, index: number) => (
              <>
                <tr
                  key={index}
                  className={`${
                    row.status === false ||
                    row.status === 'Inactive' ||
                    row.status === 'InActive'
                      ? 'bg-[#FFE2E2] text-black border-b border-[#D9E821] text-center text-[15px] font-medium'
                      : 'text-black border-b border-[#D9E821] text-center text-[15px] font-medium'
                  }`}
                >
                  <td className=" p-1 text-center  cursor-pointer flex justify-center items-center  ">
                    {currentPage > 1
                      ? (currentPage - 1) * 10 + index + 1
                      : index + 1}
                  </td>
                  {Object.keys(columns).map((colKey) => (
                    <td
                      key={colKey}
                      className="p-1 border-b border-[#D9E821]  whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {/* Handle Boolean Values */}
                      {typeof row[colKey] === 'boolean' ? (
                        row[colKey] ? (
                          <span className="">Active</span>
                        ) : (
                          <span className="text-red-500">Inactive</span>
                        )
                      ) : (
                        getVal(colKey, row[colKey], row)
                      )}
                    </td>
                  ))}
                  <td
                    className="p-1 text-center  cursor-pointer flex justify-center items-center text-[#D9E821]"
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    <FaEye style={{ fontSize: '24px' }} />
                  </td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td
                colSpan={Object.keys(columns).length + 1} // Add 1 for the "Manage" column
                className="p-2 text-center"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
