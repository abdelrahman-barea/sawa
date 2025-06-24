'use client'

import React from 'react'
import { Check, Crown } from 'lucide-react'
import { PageContainer } from './UI/PageContainer'
import { Button } from './UI/Button'

interface PremiumProps {
  navigate: (page: string) => void
}

export const Premium: React.FC<PremiumProps> = ({ navigate }) => {
  const freeFeatures = [
    'Schedule Table',
    '50-minute Meeting Duration',
    'Basic Session Types',
    'Standard Support'
  ]

  const premiumFeatures = [
    'Unlimited session duration',
    'Adjust your avatar',
    'View other users score',
    'Adjustable studying styles',
    'Unlimited generated quizzes',
    'See who viewed your profile',
    'Priority Support',
    'Advanced Analytics'
  ]

  const handleSubscribe = () => {
    alert('Subscription feature coming soon! This would integrate with payment providers.')
  }

  return (
    <PageContainer>
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Premium Features</h1>
          <p className="text-white/80">Unlock the full potential of Sawa</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-sawa-blue mb-2">
                Free Subscription
              </h2>
              <p className="text-gray-600">الاشتراك المجاني</p>
              <div className="text-3xl font-bold text-sawa-blue mt-4">$0</div>
              <p className="text-gray-500">Forever</p>
            </div>

            <div className="space-y-3 mb-8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={() => navigate('sawa')}
              className="w-full"
            >
              Continue with Free
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-sawa-orange relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-sawa-orange text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                <Crown size={16} className="mr-1" />
                Popular
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-sawa-orange mb-2">
                Paid Subscription
              </h2>
              <p className="text-gray-600">الاشتراك المدفوع</p>
              <div className="text-3xl font-bold text-sawa-orange mt-4">$9.99</div>
              <p className="text-gray-500">per month</p>
            </div>

            <div className="space-y-3 mb-8">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check size={20} className="text-sawa-orange mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleSubscribe}
              className="w-full"
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('sawa')}
            className="text-white hover:text-sawa-orange transition-colors"
          >
            ← Back to Sawa Home
          </button>
        </div>
      </div>
    </PageContainer>
  )
}