import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeRange, getTimeRangeLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  description: string;
  value: string | number;
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
  isPercentage?: boolean;
  className?: string;
  valueClassName?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  description,
  value,
  timeRange,
  // onTimeRangeChange,
  isPercentage = false,
  className = '',
  valueClassName = '',
}) => {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription className="text-xs">
          {description} {getTimeRangeLabel(timeRange)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className={cn("text-3xl font-bold tracking-tight", valueClassName)}>
            {value}{isPercentage ? '' : ''}
          </div>
          {/* <Select 
            value={timeRange} 
            onValueChange={(value) => onTimeRangeChange(value as TimeRange)}
          >
            <SelectTrigger className="h-7 text-xs w-full">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="28days">28 days</SelectItem>
              <SelectItem value="6months">6 months</SelectItem>
              <SelectItem value="1year">1 year</SelectItem>
              <SelectItem value="5years">5 years</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;