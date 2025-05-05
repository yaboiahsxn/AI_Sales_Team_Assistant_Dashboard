
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const data = [
  { name: 'Week 1', positive: 4, neutral: 2, negative: 1 },
  { name: 'Week 2', positive: 3, neutral: 3, negative: 2 },
  { name: 'Week 3', positive: 5, neutral: 2, negative: 1 },
  { name: 'Week 4', positive: 6, neutral: 3, negative: 0 },
];

export function SentimentTrend() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Call Sentiment Trends</CardTitle>
        <Select defaultValue="month">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="positive" fill="#10B981" stackId="a" name="Positive" />
              <Bar dataKey="neutral" fill="#64748B" stackId="a" name="Neutral" />
              <Bar dataKey="negative" fill="#F43F5E" stackId="a" name="Negative" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
