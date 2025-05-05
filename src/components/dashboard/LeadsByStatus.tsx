
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Hot', value: 8, color: '#F97316' },
  { name: 'Warm', value: 15, color: '#F59E0B' },
  { name: 'Cold', value: 24, color: '#38BDF8' },
];

export function LeadsByStatus() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Leads by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} leads`, '']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
          {data.map((status) => (
            <div key={status.name} className="rounded-md p-2 bg-gray-50">
              <div className="font-medium">{status.name}</div>
              <div className="text-gray-500">{status.value} leads</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
