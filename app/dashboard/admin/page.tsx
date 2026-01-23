"use client"

import DashboardPage from '@/components/dashboard/DashBoard'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { user } = useAuth()
  const router = useRouter();

  if(!user || user.role !== "admin"){
    router.replace("/")
  }
  
  return (
    <div>
      <DashboardPage role="admin" userName={user?.name} />
    </div>
  )
}

export default Page