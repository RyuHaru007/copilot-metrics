import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { getOrganizationChartData } from '@/data/mockData';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';

const Organization: React.FC = () => {
  const { organizationTimeRange, setOrganizationTimeRange } = useUIStore();
  const data = getOrganizationChartData(organizationTimeRange);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Organization</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          title="Acceptance rate by count (%)"
          data={data.labels.map((label, index) => ({
            name: label,
            value: data.acceptanceRateByCount[index]
          }))}
          lines={[
            { dataKey: 'value', name: 'Acceptance rate by count (%)', color: '#10b981' }
          ]}
          xAxisDataKey="name"
          timeRange={organizationTimeRange}
          onTimeRangeChange={setOrganizationTimeRange}
          yAxisLabel="Percentage"
          isPercentage
        />
        
        <LineChart
          title="Total Suggestion Count | Total Acceptances count"
          data={data.labels.map((label, index) => ({
            name: label,
            suggestions: data.suggestionCount[index],
            acceptances: data.acceptanceCount[index]
          }))}
          lines={[
            { dataKey: 'suggestions', name: 'Total Suggestions', color: '#3b82f6' },
            { dataKey: 'acceptances', name: 'Total Acceptances', color: '#10b981' }
          ]}
          xAxisDataKey="name"
          timeRange={organizationTimeRange}
          onTimeRangeChange={setOrganizationTimeRange}
          yAxisLabel="Count"
        />
        
        <LineChart
          title="Acceptance rate by lines (%)"
          data={data.labels.map((label, index) => ({
            name: label,
            value: data.acceptanceRateByLines[index]
          }))}
          lines={[
            { dataKey: 'value', name: 'Acceptance rate by lines (%)', color: '#6366f1' }
          ]}
          xAxisDataKey="name"
          timeRange={organizationTimeRange}
          onTimeRangeChange={setOrganizationTimeRange}
          yAxisLabel="Percentage"
          isPercentage
        />
        
        <LineChart
          title="Total Suggestion Lines | Total Acceptances Lines"
          data={data.labels.map((label, index) => ({
            name: label,
            suggestions: data.suggestionLines[index],
            acceptances: data.acceptanceLines[index]
          }))}
          lines={[
            { dataKey: 'suggestions', name: 'Total Suggestion Lines', color: '#8b5cf6' },
            { dataKey: 'acceptances', name: 'Total Acceptance Lines', color: '#14b8a6' }
          ]}
          xAxisDataKey="name"
          timeRange={organizationTimeRange}
          onTimeRangeChange={setOrganizationTimeRange}
          yAxisLabel="Lines"
        />
        
        <BarChart
          title="Total Active Users"
          data={data.labels.map((label, index) => ({
            name: label,
            users: data.activeUsers[index]
          }))}
          dataKey="users"
          xAxisDataKey="name"
          name="Active Users"
          color="#f59e0b"
          timeRange={organizationTimeRange}
          onTimeRangeChange={setOrganizationTimeRange}
          yAxisLabel="Users"
        />
      </div>
    </div>
  );
};

export default Organization;