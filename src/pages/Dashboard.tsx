import React from 'react';
import { formatNumber, formatPercent } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { getDashboardData } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MetricCard from '@/components/MetricCard';
import { TimeRange } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { dashboardTimeRange, setDashboardTimeRange } = useUIStore();
  const data = getDashboardData(dashboardTimeRange);

  return (
    <div className="space-y-4">
      <div>
      <h1 className="flex inline-flex items-center gap-2 text-2xl font-bold">Dashboard</h1>
      <span className="float-right">
      <Select 
            value={dashboardTimeRange} 
            onValueChange={(value) => setDashboardTimeRange(value as TimeRange)}
          >
            <SelectTrigger className="h-10 text-base w-56">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="28days">28 days</SelectItem>
              <SelectItem value="6months">6 months</SelectItem>
              <SelectItem value="1year">1 year</SelectItem>
              <SelectItem value="5years">5 years</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Acceptance rate (by count)"
          description="Over the last"
          value={formatPercent(data.acceptanceRateByCount)}
          timeRange={dashboardTimeRange}
          onTimeRangeChange={setDashboardTimeRange}
          isPercentage
          valueClassName="text-emerald-600"
        />
        
        <MetricCard
          title="Total count of Suggestions (Prompts)"
          description="Over the last"
          value={formatNumber(data.totalSuggestionCount)}
          timeRange={dashboardTimeRange}
          onTimeRangeChange={setDashboardTimeRange}
          valueClassName="text-blue-600"
        />
        
        <MetricCard
          title="Acceptance rate (by lines)"
          description="Over the last"
          value={formatPercent(data.acceptanceRateByLines)}
          timeRange={dashboardTimeRange}
          onTimeRangeChange={setDashboardTimeRange}
          isPercentage
          valueClassName="text-emerald-600"
        />
        
        <MetricCard
          title="Total lines of code suggested"
          description="Over the last"
          value={formatNumber(data.totalLinesSuggested)}
          timeRange={dashboardTimeRange}
          onTimeRangeChange={setDashboardTimeRange}
          valueClassName="text-blue-600"
        />
        
        <MetricCard
          title="Number of Languages"
          description="Over the last"
          value={formatNumber(data.languageCount)}
          timeRange={dashboardTimeRange}
          onTimeRangeChange={setDashboardTimeRange}
          valueClassName="text-purple-600"
        />
        
        <MetricCard
          title="Number of Editors"
          description="Over the last"
          value={formatNumber(data.editorCount)}
          timeRange={dashboardTimeRange}
          onTimeRangeChange={setDashboardTimeRange}
          valueClassName="text-orange-600"
        />
        
        <MetricCard
          title="Cumulative Number of Turns"
          description="Over the last"
          value={formatNumber(data.cumulativeTurns)}
          timeRange={dashboardTimeRange}
          onTimeRangeChange={setDashboardTimeRange}
          valueClassName="text-indigo-600"
        />
        
        <MetricCard
          title="Cumulative Number of Acceptances"
          description="Over the last"
          value={formatNumber(data.cumulativeAcceptances)}
          timeRange={dashboardTimeRange}
          onTimeRangeChange={setDashboardTimeRange}
          valueClassName="text-teal-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;