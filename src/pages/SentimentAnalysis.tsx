
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { FileText, Download, Filter } from 'lucide-react';

// Sample data for charts
const sentimentByMonthData = [
  { month: 'Jan', positive: 12, neutral: 8, negative: 4 },
  { month: 'Feb', positive: 15, neutral: 10, negative: 5 },
  { month: 'Mar', positive: 10, neutral: 12, negative: 8 },
  { month: 'Apr', positive: 8, neutral: 9, negative: 6 },
  { month: 'May', positive: 12, neutral: 8, negative: 3 }
];

const objectionData = [
  { name: 'Price concerns', value: 35, color: '#F59E0B' },
  { name: 'Implementation timeline', value: 25, color: '#2563EB' },
  { name: 'Feature gaps', value: 18, color: '#8B5CF6' },
  { name: 'Integration concerns', value: 15, color: '#10B981' },
  { name: 'Security concerns', value: 7, color: '#EF4444' }
];

const keywordData = [
  { keyword: 'pricing', count: 24 },
  { keyword: 'features', count: 18 },
  { keyword: 'support', count: 16 },
  { keyword: 'integration', count: 14 },
  { keyword: 'implementation', count: 13 },
  { keyword: 'competitors', count: 12 },
  { keyword: 'timeline', count: 11 },
  { keyword: 'security', count: 10 },
  { keyword: 'ROI', count: 8 },
  { keyword: 'training', count: 7 }
];

const sentimentByRepData = [
  { name: 'John Smith', positive: 65, neutral: 25, negative: 10 },
  { name: 'Sarah Johnson', positive: 55, neutral: 35, negative: 10 },
  { name: 'Michael Chen', positive: 45, neutral: 30, negative: 25 },
  { name: 'Emily Davis', positive: 70, neutral: 20, negative: 10 }
];

// Colors for the sentiment chart
const COLORS = {
  positive: '#10B981',
  neutral: '#64748B',
  negative: '#F43F5E'
};

const SentimentAnalysis = () => {
  const [timeframe, setTimeframe] = useState<string>('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sentiment Analysis</h1>
          <p className="text-gray-500 mt-2">Analyze trends and insights from your sales calls</p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Sentiment Trends Over Time</CardTitle>
            <CardDescription>
              Track positive, neutral, and negative sentiment in your sales calls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentimentByMonthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="positive" stackId="a" fill={COLORS.positive} name="Positive" />
                  <Bar dataKey="neutral" stackId="a" fill={COLORS.neutral} name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill={COLORS.negative} name="Negative" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="objections">
        <TabsList>
          <TabsTrigger value="objections">Common Objections</TabsTrigger>
          <TabsTrigger value="keywords">Frequent Keywords</TabsTrigger>
          <TabsTrigger value="reps">Sales Rep Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="objections" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Top Objections</CardTitle>
                <CardDescription>
                  Most common customer concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={objectionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {objectionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Frequency']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Objection Details</CardTitle>
                <CardDescription>
                  Analysis and recommended responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {objectionData.slice(0, 3).map((objection, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{objection.name}</h3>
                        <div className="text-sm text-gray-500">{objection.value}% of calls</div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {index === 0 && "Customers frequently mention concerns about pricing being higher than competitors. Often mentioned alongside ROI questions."}
                        {index === 1 && "Implementation timeline concerns typically arise from enterprise clients with complex integrations needs."}
                        {index === 2 && "Feature comparison with competitors shows gaps in reporting functionality and custom workflows."}
                      </p>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium">Recommended Response:</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {index === 0 && "Focus on value proposition and ROI calculator. Mention flexible pricing options and implementation support included."}
                          {index === 1 && "Highlight phased implementation approach and dedicated onboarding team. Share case studies with similar timelines."}
                          {index === 2 && "Emphasize upcoming roadmap features. Showcase existing workarounds and API extensibility."}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Objection Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trending Keywords</CardTitle>
                <CardDescription>
                  Most frequently mentioned terms in calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={keywordData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="keyword" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keyword Context</CardTitle>
                <CardDescription>
                  How keywords appear in conversation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Pricing (24 mentions)</h3>
                    <div className="mt-2 space-y-2">
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        "Your <span className="bg-yellow-100 px-1">pricing</span> structure seems complex compared to competitors."
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        "We need to understand the <span className="bg-yellow-100 px-1">pricing</span> tiers better before making a decision."
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        "Is the <span className="bg-yellow-100 px-1">pricing</span> negotiable for larger teams?"
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Integration (14 mentions)</h3>
                    <div className="mt-2 space-y-2">
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        "How difficult is the <span className="bg-yellow-100 px-1">integration</span> with our existing CRM?"
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        "We need seamless <span className="bg-yellow-100 px-1">integration</span> with our current tools."
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View All Keyword Contexts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reps" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Rep Sentiment Performance</CardTitle>
              <CardDescription>
                How customers respond to different sales representatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sentimentByRepData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="positive" stackId="a" fill={COLORS.positive} name="Positive %" />
                    <Bar dataKey="neutral" stackId="a" fill={COLORS.neutral} name="Neutral %" />
                    <Bar dataKey="negative" stackId="a" fill={COLORS.negative} name="Negative %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {sentimentByRepData.map((rep, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="p-4">
                      <h3 className="font-medium">{rep.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.positive }}></div>
                        <span className="text-sm">{rep.positive}% Positive</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {rep.positive > 60 ? 'Strong rapport building' : 'Good technical knowledge'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SentimentAnalysis;
