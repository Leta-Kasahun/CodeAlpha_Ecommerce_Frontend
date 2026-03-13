'use client'

interface OrderActionsProps {
  currentStatus: string
  onStatusUpdate: (newStatus: string) => Promise<void>
  isUpdating?: boolean
}

export function OrderActions({ currentStatus, onStatusUpdate, isUpdating = false }: OrderActionsProps) {
  if (currentStatus === 'completed') {
    return null
  }

  const nextStatus = currentStatus === 'processing' ? 'shipped' : 'completed'

  return (
    <button
      onClick={() => onStatusUpdate(nextStatus)}
      disabled={isUpdating}
      className={`px-4 py-2 text-white rounded text-sm font-medium transition-colors ${
        currentStatus === 'processing'
          ? 'bg-[#E6B84A] hover:bg-[#d4a53e]'
          : 'bg-[#5156D2] hover:bg-[#4347c4]'
      } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isUpdating ? 'Updating...' : currentStatus === 'processing' ? 'Ship Order' : 'Complete Order'}
    </button>
  )
}
