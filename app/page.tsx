'use client'

import { useEffect, useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { SmartEntry } from './components/SmartEntry'
import { SignUp } from './components/SignUp'
import { Login } from './components/Login'
import { ForgotPassword } from './components/ForgotPassword'
import { SawaHome } from './components/SawaHome'
import { CameraSelection } from './components/CameraSelection'
import { Connection } from './components/Connection'
import { Rating } from './components/Rating'
import { Premium } from './components/Premium'

type Page = 'smart-entry' | 'signup' | 'login' | 'forgot-password' | 'sawa' | 'camera-selection' | 'connection' | 'rating' | 'premium'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('smart-entry')
  const [pageData, setPageData] = useState<any>({})

  const navigate = (page: Page, data?: any) => {
    setCurrentPage(page)
    if (data) setPageData(data)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'smart-entry':
        return <SmartEntry navigate={navigate} />
      case 'signup':
        return <SignUp navigate={navigate} />
      case 'login':
        return <Login navigate={navigate} />
      case 'forgot-password':
        return <ForgotPassword navigate={navigate} />
      case 'sawa':
        return <SawaHome navigate={navigate} />
      case 'camera-selection':
        return <CameraSelection navigate={navigate} pageData={pageData} />
      case 'connection':
        return <Connection navigate={navigate} pageData={pageData} />
      case 'rating':
        return <Rating navigate={navigate} pageData={pageData} />
      case 'premium':
        return <Premium navigate={navigate} />
      default:
        return <SmartEntry navigate={navigate} />
    }
  }

  return (
    <AuthProvider>
      <div className="min-h-screen">
        {renderPage()}
      </div>
    </AuthProvider>
  )
}