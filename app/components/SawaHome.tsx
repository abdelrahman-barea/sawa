'use client'

import React, { useState } from 'react'
import { PageContainer } from './UI/PageContainer'
import { Card } from './UI/Card'
import { Button } from './UI/Button'
import { ChatbotIcon } from './ChatbotIcon'

interface SessionOptions {
  type: 'individual' | 'group' | 'community' | 'explanation'
  duration: 15 | 25 | 30 | 45 | 50 | 60
  isPremium: boolean
}

interface SawaHomeProps {
  navigate: (page: string, data?: any) => void
}

export const SawaHome: React.FC<SawaHomeProps> = ({ navigate }) => {
  const [sessionOptions, setSessionOptions] = useState<SessionOptions>({
    type: 'individual',
    duration: 25,
    isPremium: false,
  })

  const sessionTypes = [
    { value: 'individual', label: 'Individual Session' },
    { value: 'group', label: 'Group Session' },
    { value: 'community', label: 'Join Community' },
    { value: 'explanation', label: 'Request Explanation' },
  ]

  const durations = [
    { value: 15, label: '15 minutes' },
    { value: 25, label: '25 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 50, label: '50 minutes' },
    { value: 60, label: '+60 minutes (Premium)', isPremium: true },
  ]

  const handleStart = () => {
    if (sessionOptions.duration === 60) {
      navigate('premium')
    } else if (sessionOptions.type === 'individual' || sessionOptions.type === 'group') {
      navigate('camera-selection', { sessionOptions })
    } else {
      alert('This feature will be available soon!')
    }
  }

  return (
    <PageContainer className="relative">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white font-arabic mb-4">
            سوا
          </h1>
          <p className="text-white/80 text-lg">Your Study Companion</p>
        </div>

        <Card className="max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-sawa-blue mb-4">Session Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {sessionTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      sessionOptions.type === type.value
                        ? 'border-sawa-orange bg-sawa-orange/10 text-sawa-orange'
                        : 'border-gray-300 hover:border-sawa-orange/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sessionType"
                      value={type.value}
                      checked={sessionOptions.type === type.value}
                      onChange={(e) => setSessionOptions(prev => ({ 
                        ...prev, 
                        type: e.target.value as SessionOptions['type']
                      }))}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-sawa-blue mb-4">Session Duration</h3>
              <div className="grid grid-cols-3 gap-3">
                {durations.map((duration) => (
                  <label
                    key={duration.value}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all relative ${
                      sessionOptions.duration === duration.value
                        ? 'border-sawa-orange bg-sawa-orange/10 text-sawa-orange'
                        : 'border-gray-300 hover:border-sawa-orange/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={duration.value}
                      checked={sessionOptions.duration === duration.value}
                      onChange={(e) => setSessionOptions(prev => ({ 
                        ...prev, 
                        duration: parseInt(e.target.value) as SessionOptions['duration'],
                        isPremium: duration.isPremium || false
                      }))}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{duration.label}</span>
                    {duration.isPremium && (
                      <span className="absolute -top-1 -right-1 bg-sawa-orange text-white text-xs px-1 rounded">
                        Premium
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <Button onClick={handleStart} className="mt-8">
              Start Session
            </Button>
          </div>
        </Card>
      </div>

      <ChatbotIcon />
    </PageContainer>
  )
}