'use client'

import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { PageContainer } from './UI/PageContainer'
import { Card } from './UI/Card'
import { Button } from './UI/Button'

interface RatingProps {
  navigate: (page: string) => void
  pageData: any
}

export const Rating: React.FC<RatingProps> = ({ navigate, pageData }) => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const partnerId = pageData?.partnerId
  const partnerName = partnerId === '1' ? 'Ahmed' : 'Sara'

  const handleContinue = () => {
    if (typeof window !== 'undefined') {
      const ratingData = {
        partnerId,
        rating,
        timestamp: new Date().toISOString(),
      }
      
      const existingRatings = JSON.parse(localStorage.getItem('sawaRatings') || '[]')
      existingRatings.push(ratingData)
      localStorage.setItem('sawaRatings', JSON.stringify(existingRatings))
    }

    navigate('sawa')
  }

  return (
    <PageContainer>
      <Card title="تقييم" className="max-w-md">
        <div className="text-center space-y-6">
          <p className="text-gray-600">
            How was your session with {partnerName}?
          </p>

          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all duration-200 hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <div className="text-center">
              <p className="text-sawa-blue font-medium">
                {rating === 1 && "We'll work on improving"}
                {rating === 2 && "Thanks for the feedback"}
                {rating === 3 && "Good session!"}
                {rating === 4 && "Great session!"}
                {rating === 5 && "Excellent session!"}
              </p>
            </div>
          )}

          <Button 
            onClick={handleContinue}
            disabled={rating === 0}
            className="mt-8"
          >
            Continue
          </Button>
        </div>
      </Card>
    </PageContainer>
  )
}