'use client'

import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export const ChatbotIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <>
      <div 
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && !isOpen && (
          <div className="absolute bottom-16 right-0 bg-white text-sawa-blue px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap animate-fade-in">
            Do you need any help?
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-sawa-orange text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center animate-bounce-subtle hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-end justify-end p-4">
          <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-sawa-blue">Sawa Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-sawa-light-gray p-3 rounded-lg">
                  <p className="text-sm text-sawa-blue">
                    Hello! How can I help you with Sawa today?
                  </p>
                </div>
                <div className="bg-sawa-orange text-white p-3 rounded-lg ml-8">
                  <p className="text-sm">
                    I'm here to assist you with sessions, premium features, and any questions you might have.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sawa-orange"
                />
                <button className="bg-sawa-orange text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}