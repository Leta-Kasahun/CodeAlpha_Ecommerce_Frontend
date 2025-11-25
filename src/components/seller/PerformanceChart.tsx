// src/components/seller/PerformanceChart.tsx
// Performance chart placeholder

'use client'

export function PerformanceChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h2>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#5156D2] to-[#E6B84A] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">📈</span>
          </div>
          <p className="text-gray-600">Sales chart will be displayed here</p>
          <p className="text-sm text-gray-500 mt-1">Integration with charts library</p>
        </div>
      </div>
    </div>
  )
}