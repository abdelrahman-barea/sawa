'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  fullName: string
  email: string
  isRegistered: boolean
  lastLogin?: Date
  educationalCategory?: string
  ageGroup?: string
  fieldOfInterest?: string[]
  avatar?: string
  score?: number
  isPremium: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (fullName: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  resetPassword: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('sawaUser')
      const storedAuth = localStorage.getItem('sawaAuth')
      
      if (storedUser && storedAuth === 'true') {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false
    
    const storedUsers = JSON.parse(localStorage.getItem('sawaUsers') || '[]')
    const foundUser = storedUsers.find((u: User) => u.email === email)
    
    if (foundUser) {
      const updatedUser = { ...foundUser, lastLogin: new Date() }
      setUser(updatedUser)
      setIsAuthenticated(true)
      
      localStorage.setItem('sawaUser', JSON.stringify(updatedUser))
      localStorage.setItem('sawaAuth', 'true')
      
      const updatedUsers = storedUsers.map((u: User) => 
        u.email === email ? updatedUser : u
      )
      localStorage.setItem('sawaUsers', JSON.stringify(updatedUsers))
      
      return true
    }
    return false
  }

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false
    
    const storedUsers = JSON.parse(localStorage.getItem('sawaUsers') || '[]')
    const existingUser = storedUsers.find((u: User) => u.email === email)
    
    if (existingUser) {
      return false
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      fullName,
      email,
      isRegistered: true,
      isPremium: false,
    }
    
    const updatedUsers = [...storedUsers, newUser]
    localStorage.setItem('sawaUsers', JSON.stringify(updatedUsers))
    
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sawaUser')
      localStorage.removeItem('sawaAuth')
    }
  }

  const resetPassword = async (email: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false
    
    const storedUsers = JSON.parse(localStorage.getItem('sawaUsers') || '[]')
    const foundUser = storedUsers.find((u: User) => u.email === email)
    return !!foundUser
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}