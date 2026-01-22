"use client"

import DashboardPage from '@/components/dashboard/DashBoard'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const Page = () => {
  const { user } = useAuth()
  
  return (
    <div>
      <DashboardPage role="admin" userName={user?.name} />
    </div>
  )
}

export default Page