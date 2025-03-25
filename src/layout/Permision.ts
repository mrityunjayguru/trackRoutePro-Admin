export interface PermissionItem {
  name: any;
  permissions: any;
  value: any;
}

export const Permission: PermissionItem[] = [
  { name: 'Manage_User', permissions: ['Add', 'View', 'Update'], value: ['Add', 'View', 'Update'] },
  { name: 'Manage_Dealer', permissions: ['Add', 'View', 'Update'], value: ['Add', 'View', 'Update'] },
  { name: 'Manage_Device', permissions: ['Add', 'View', 'Update'], value: ['Add', 'View', 'Update'] },
  { name: 'Map_Overview', permissions: ['View'], value: ['View'] },
  { name: 'Reports', permissions: ['View'], value: ['View'] },
  { name: 'Route_History', permissions: ['View'], value: ['View'] },

  { name: 'Notification', permissions: ['Add', 'View'], value: ['Add', 'View'] },
  { name: 'Manage_Inventory', permissions: ['Add', 'View'], value: ['Add', 'View'] },
  { name: 'Subscriber_Support', permissions: ['View', 'Update'], value: ['View', 'Update'] },
  { name: 'Dealer_Vehicle_Request', permissions: ['View', 'Update'], value: ['View', 'Update'] },
  { name: 'Renew_Request', permissions: ['View', 'Update'], value: ['View', 'Update'] },
  { name: 'Manage_Type_Vehicle_Icon', permissions: ['View', 'Update'], value: ['View', 'Update'] },
  { name: 'Application_Setting', permissions: ['View', 'Update'], value: ['View', 'Update'] },
];


export const PermissionModerate : PermissionItem[] = [
  { name: 'Manage_User', permissions: ['Add', 'View', 'Update'], value: ['Add', 'View', 'Update'] },
  { name: 'Manage_Dealer', permissions: ['Add', 'View', 'Update'], value: ['View'] },
  { name: 'Manage_Device', permissions: ['Add', 'View', 'Update'], value: [] },
  { name: 'Map_Overview', permissions: ['View'], value: [] },
  { name: 'Reports', permissions: ['View'], value: ['View'] },
  { name: 'Route_History', permissions: ['View'], value: ['View'] },
  { name: 'Route_History', permissions: ['View'], value: ['View'] },

  
  { name: 'Notification', permissions: ['Add', 'View'], value: ['View'] },
  { name: 'Manage_Inventory', permissions: ['Add', 'View'], value: ['View'] },
  { name: 'Subscriber_Support', permissions: ['View', 'Update'], value: [] },
  { name: 'Dealer_Vehicle_Request', permissions: ['View', 'Update'], value: ['View',] },
  { name: 'Renew_Request', permissions: ['View', 'Update'], value: ['View', 'Update'] },
  { name: 'Manage_Type_Vehicle_Icon', permissions: ['View'], value: ['View',] },
  { name: 'Application_Setting', permissions: ['View', 'Update'], value: [] },
];

export const PermissionOperator: PermissionItem[] = [
  { name: 'Manage_User', permissions: ['Add', 'View', 'Update'], value: ['View'] },
  { name: 'Manage_Dealer', permissions: ['Add', 'View', 'Update'], value: ['View'] },
  { name: 'Manage_Device', permissions: ['Add', 'View', 'Update'], value: [] },
  { name: 'Map_Overview', permissions: ['View'], value: [] },
  { name: 'Reports', permissions: ['View'], value: ['View'] },
  { name: 'Route_History', permissions: ['View'], value: [''] },

  { name: 'Notification', permissions: ['Add', 'View'], value: ['View'] },
  { name: 'Manage_Inventory', permissions: ['Add', 'View'], value: ['View'] },
  { name: 'Subscriber_Support', permissions: ['View', 'Update'], value: ['View'] },
  { name: 'Dealer_Vehicle_Request', permissions: ['View', 'Update'], value: ['View',] },
  { name: 'Renew_Request', permissions: ['View', 'Update'], value: ['View'] },
  { name: 'Manage_Type_Vehicle_Icon', permissions: ['View'], value: ['View',] },
  { name: 'Application_Setting', permissions: ['View', 'Update'], value: [] },
];