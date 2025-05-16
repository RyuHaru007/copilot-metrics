import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { getCopilotChatData } from '@/data/mockData';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';

const CopilotChat: React.FC = () => {
  const { copilotChatTimeRange, setCopilotChatTimeRange } = useUIStore();
  const data = getCopilotChatData(copilotChatTimeRange);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Copilot Chat</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          title="Total Acceptances | Total Turns Count"
          data={data.labels.map((label, index) => ({
            name: label,
            acceptances: data.acceptanceCount[index],
            turns: data.turnsCount[index]
          }))}
          lines={[
            { dataKey: 'turns', name: 'Total Turns', color: '#8b5cf6' },
            { dataKey: 'acceptances', name: 'Total Acceptances', color: '#10b981' }
          ]}
          xAxisDataKey="name"
          timeRange={copilotChatTimeRange}
          onTimeRangeChange={setCopilotChatTimeRange}
          yAxisLabel="Count"
        />
        
        <BarChart
          title="Total Active Copilot Chat Users"
          data={data.labels.map((label, index) => ({
            name: label,
            users: data.activeUsers[index]
          }))}
          dataKey="users"
          xAxisDataKey="name"
          name="Active Users"
          color="#f59e0b"
          timeRange={copilotChatTimeRange}
          onTimeRangeChange={setCopilotChatTimeRange}
          yAxisLabel="Users"
        />
      </div>
    </div>
  );
};

export default CopilotChat;