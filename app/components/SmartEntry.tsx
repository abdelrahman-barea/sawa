'use client'

import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { PageContainer } from './UI/PageContainer'

interface SmartEntryProps {
  navigate: (page: string) => void
}

export const SmartEntry: React.FC<SmartEntryProps> = ({ navigate }) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = JSON.parse(localStorage.getItem('sawaUsers') || '[]')
      const hasRegisteredUsers = storedUsers.length > 0

      if (isAuthenticated) {
        navigate('sawa')
      } else if (hasRegisteredUsers) {
        navigate('login')
      } else {
        navigate('signup')
      }
    }
  }, [navigate, isAuthenticated])

  return (
    <PageContainer>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sawa-orange mx-auto mb-4"></div>
          <p className="text-sawa-blue">Loading Sawa...</p>
        </div>
      </div>
    </PageContainer>
  )
}