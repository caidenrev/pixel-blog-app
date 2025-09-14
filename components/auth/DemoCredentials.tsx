'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DemoCredentialsProps {
  onFillCredentials: (email: string, password: string) => void
}

export default function DemoCredentials({ onFillCredentials }: DemoCredentialsProps) {
  const [copied, setCopied] = useState(false)

  const credentials = {
    email: 'admin@pixelblog.com',
    password: 'admin123456'
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleFillCredentials = () => {
    onFillCredentials(credentials.email, credentials.password)
  }

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-blue-800">Demo Admin Account</h4>
        <Button
          size="sm"
          variant="outline"
          onClick={handleFillCredentials}
          className="text-xs h-7 px-2"
        >
          Fill Form
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-blue-700 font-medium">Email:</span>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-white px-2 py-1 rounded border">
              {credentials.email}
            </code>
            <button
              onClick={() => handleCopy(credentials.email)}
              className="p-1 hover:bg-blue-100 rounded transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-blue-700 font-medium">Password:</span>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-white px-2 py-1 rounded border">
              {credentials.password}
            </code>
            <button
              onClick={() => handleCopy(credentials.password)}
              className="p-1 hover:bg-blue-100 rounded transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
