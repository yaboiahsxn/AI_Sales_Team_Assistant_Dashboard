
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
  className?: string;
};

export function StatCard({ title, value, icon, description, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend > 0 ? "text-emerald-600" : "text-red-600"
                  )}
                >
                  {trend > 0 ? `+${trend}%` : `${trend}%`}
                </span>
                <span className="ml-1 text-xs text-gray-500">vs last month</span>
              </div>
            )}
          </div>
          <div className="rounded-full p-2 bg-revbot-primary/10 text-revbot-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
