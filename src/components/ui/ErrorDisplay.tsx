// Error display component without cn dependency
// Path: src/components/ui/ErrorDisplay.tsx

import { AlertCircle } from 'lucide-react'

interface ErrorDisplayProps {
  message: string
  className?: string
}

export function ErrorDisplay({ message, className = '' }: ErrorDisplayProps) {
  return (
    <div className={`flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm ${className}`}>
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}