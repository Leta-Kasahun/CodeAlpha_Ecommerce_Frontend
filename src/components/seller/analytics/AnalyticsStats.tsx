// File: src/components/seller/analytics/AnalyticsStats.tsx
'use client'

interface AnalyticsStatsProps {
  topProducts: Array<{ name: string; revenue: number; sales: number }>
  statusData: Array<{ name: string; value: number }>
  totalOrders: number
  dateRange: string
  totalRevenue: number
}

export function AnalyticsStats({ 
  topProducts, 
  statusData, 
  totalOrders, 
  dateRange, 
  totalRevenue 
}: AnalyticsStatsProps) {
  const conversionRate = ((statusData.find(s => s.name === 'Completed')?.value || 0) / totalOrders * 100).toFixed(1)
  
  const stats = [
    {
      title: 'Best Selling Product',
      content: topProducts[0] ? (
        <div className="space-y-1">
          <p className="text-lg font-bold text-[#5156D2]">{topProducts[0].name}</p>
          <p className="text-gray-600 text-sm">${topProducts[0].revenue.toFixed(2)} revenue</p>
          <p className="text-gray-600 text-sm">{topProducts[0].sales} units sold</p>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No data</p>
      )
    },
    {
      title: 'Conversion Rate',
      content: (
        <div>
          <p className="text-2xl font-bold text-[#E6B84A]">{conversionRate}%</p>
          <p className="text-gray-600 text-sm mt-1">Orders completed</p>
        </div>
      )
    },
    {
      title: 'Period Summary',
      content: (
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Date Range:</span>
            <span className="text-gray-900 font-medium">
              {dateRange === '7days' ? '7 Days' :
               dateRange === '30days' ? '30 Days' :
               dateRange === '90days' ? '90 Days' : '1 Year'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Orders Processed:</span>
            <span className="text-gray-900 font-medium">{totalOrders}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Revenue:</span>
            <span className="text-gray-900 font-medium">${totalRevenue.toFixed(2)}</span>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">{stat.title}</h4>
          {stat.content}
        </div>
      ))}
    </div>
  )
}