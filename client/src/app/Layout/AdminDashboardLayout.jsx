import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../features/Admin-Dashboard/ui/components/Sidebar'

const AdminDashboardLayout = () => {
  return (
    <div className="flex bg-slate-950 min-h-screen">
        <Sidebar/>
        <div className="flex-1 p-8 overflow-y-auto">
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminDashboardLayout