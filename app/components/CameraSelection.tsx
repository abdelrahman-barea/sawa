'use client'

import React, { useState } from 'react'
import { Camera, User } from 'lucide-react'
import { PageContainer } from './UI/PageContainer'
import { Card } from './UI/Card'
import { Button } from './UI/Button'

interface CameraSelectionProps {
  navigate: (page: string, data?: any) => void
  pageData: any
}

export const CameraSelection: React.FC<CameraSelectionProps> = ({ navigate, pageData }) => {
  const [selectedOption, setSelectedOption] = useState<'camera' | 'avatar' | null>(null)
  
  const sessionOptions = pageData?.sessionOptions

  const handleContinue = () => {
    if (selectedOption) {
      navigate('connection', { 
        sessionOptions, 
        cameraOption: selectedOption 
      })
    }
  }

  return (
    <PageContainer>
      <Card 
        title="Camera Required or Use Avatar"
        showCloseButton 
        onClose={() => navigate('sawa')}
        className="max-w-lg"
      >
        <div className="space-y-6">
          <p className="text-center text-gray-600 mb-6">
            Choose how you want to appear in your session
          </p>

          <div className="space-y-4">
            <label
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedOption === 'camera'
                  ? 'border-sawa-orange bg-sawa-orange/10'
                  : 'border-gray-300 hover:border-sawa-orange/50'
              }`}
            >
              <input
                type="radio"
                name="cameraOption"
                value="camera"
                checked={selectedOption === 'camera'}
                onChange={() => setSelectedOption('camera')}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  selectedOption === 'camera' ? 'bg-sawa-orange text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <Camera size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-sawa-blue">Open Camera</h3>
                  <p className="text-sm text-gray-600">Use your webcam for the session</p>
                </div>
              </div>
            </label>

            <label
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedOption === 'avatar'
                  ? 'border-sawa-orange bg-sawa-orange/10'
                  : 'border-gray-300 hover:border-sawa-orange/50'
              }`}
            >
              <input
                type="radio"
                name="cameraOption"
                value="avatar"
                checked={selectedOption === 'avatar'}
                onChange={() => setSelectedOption('avatar')}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  selectedOption === 'avatar' ? 'bg-sawa-orange text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-sawa-blue">Use Avatar</h3>
                  <p className="text-sm text-gray-600">Represent yourself with an avatar</p>
                </div>
              </div>
            </label>
          </div>

          <Button 
            onClick={handleContinue} 
            disabled={!selectedOption}
            className="mt-8"
          >
            Continue
          </Button>
        </div>
      </Card>
    </PageContainer>
  )
}