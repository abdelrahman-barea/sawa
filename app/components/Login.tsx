'use client'

import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { PageContainer } from './UI/PageContainer'
import { Card } from './UI/Card'
import { Input } from './UI/Input'
import { Button } from './UI/Button'
import { Checkbox } from './UI/Checkbox'

interface LoginProps {
  navigate: (page: string) => void
}

export const Login: React.FC<LoginProps> = ({ navigate }) => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setErrors({
        general: 'Please enter both email and password',
      })
      return
    }

    setIsLoading(true)
    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        navigate('sawa')
      } else {
        setErrors({ general: 'Invalid email or password' })
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageContainer>
      <Card title="Login">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember Me"
              checked={formData.rememberMe}
              onChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked }))}
            />
            <button 
              type="button"
              onClick={() => navigate('forgot-password')} 
              className="text-sawa-orange hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </div>

          {errors.general && (
            <p className="text-sm text-red-600 text-center">{errors.general}</p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('signup')} 
              className="text-sawa-orange hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </Card>
    </PageContainer>
  )
}