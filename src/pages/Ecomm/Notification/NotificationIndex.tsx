import React from 'react'
import NotificationForm from './Component/NotificationForm'
import NotificationTable from './Component/NotificationTable'

function NotificationIndex() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full ">
        <NotificationForm />
        <NotificationTable />
      </div>
  )
}

export default NotificationIndex
