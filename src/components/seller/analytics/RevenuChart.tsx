// File: src/components/seller/analytics/RevenueChart.tsx
'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Revenue Trend</h3>
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280" 
              fontSize={12} 
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              stroke="#6B7280" 
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{ 
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#5156D2" 
              strokeWidth={3}
              dot={{ fill: '#5156D2', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#5156D2' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}