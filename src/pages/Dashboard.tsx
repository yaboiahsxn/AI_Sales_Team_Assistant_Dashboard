
import React from 'react';
import { ChartBar, Upload, Users, FileText, Send } from "lucide-react";
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LeadsByStatus } from '@/components/dashboard/LeadsByStatus';
import { SentimentTrend } from '@/components/dashboard/SentimentTrend';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome back, John! Here's your sales overview.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Calls"
          value="28"
          icon={<Upload className="h-5 w-5" />}
          trend={12}
        />
        <StatCard
          title="Lead Score Updates"
          value="47"
          icon={<Users className="h-5 w-5" />}
          trend={5}
        />
        <StatCard
          title="Meeting Summaries"
          value="16"
          icon={<FileText className="h-5 w-5" />}
          trend={-3}
        />
        <StatCard
          title="Emails Generated"
          value="32"
          icon={<Send className="h-5 w-5" />}
          trend={8}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 lg:col-span-5">
          <SentimentTrend />
        </div>
        <div className="md:col-span-3 lg:col-span-2">
          <LeadsByStatus />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 lg:col-span-5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Objections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-gray-100">Price too high</Badge>
                <Badge variant="outline" className="bg-gray-100">Need approval</Badge>
                <Badge variant="outline" className="bg-gray-100">Timeline concerns</Badge>
                <Badge variant="outline" className="bg-gray-100">Integration questions</Badge>
                <Badge variant="outline" className="bg-gray-100">Competitor offering</Badge>
                <Badge variant="outline" className="bg-gray-100">Budget constraints</Badge>
                <Badge variant="outline" className="bg-gray-100">Current solution works</Badge>
                <Badge variant="outline" className="bg-gray-100">ROI concerns</Badge>
                <Badge variant="outline" className="bg-gray-100">Needs more features</Badge>
                <Badge variant="outline" className="bg-gray-100">Security requirements</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3 lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
