import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { getLanguagesData } from '@/data/mockData';
import PieChart from '@/components/charts/PieChart';
import DataTable from '@/components/DataTable';
import { formatNumber, formatPercent } from '@/lib/utils';

const Languages: React.FC = () => {
  const { languagesTimeRange, setLanguagesTimeRange } = useUIStore();
  const allLanguagesData = getLanguagesData(languagesTimeRange);
  
  // Get top 5 languages by accepted prompts
  const top5Languages = [...allLanguagesData]
    .sort((a, b) => b.acceptedPrompts - a.acceptedPrompts)
    .slice(0, 5);
  
  const tableColumns = [
    { key: 'name', header: 'Language Name' },
    { key: 'acceptedPrompts', header: 'Accepted Prompts', isNumeric: true },
    { key: 'suggestedPrompts', header: 'Suggested Prompts', isNumeric: true },
    { key: 'acceptedLines', header: 'Accepted Lines', isNumeric: true },
    { key: 'suggestedLines', header: 'Suggested Lines', isNumeric: true },
    { key: 'acceptanceRateByLines', header: 'Acceptance Rate by Lines (%)', isNumeric: true, isPercentage: true }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Languages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PieChart
          title="Top 5 Languages by Accepted Suggestions"
          data={top5Languages}
          dataKey="acceptedPrompts"
          nameKey="name"
          colorKey="color"
          timeRange={languagesTimeRange}
          onTimeRangeChange={setLanguagesTimeRange}
        />
        
        <PieChart
          title="Acceptance Rate (by Count) for Top 5 Languages"
          data={top5Languages.map(lang => ({
            name: lang.name,
            value: (lang.acceptedPrompts / lang.suggestedPrompts) * 100,
            color: lang.color
          }))}
          dataKey="value"
          nameKey="name"
          colorKey="color"
          timeRange={languagesTimeRange}
          onTimeRangeChange={setLanguagesTimeRange}
          isPercentage
        />
        
        <PieChart
          title="Acceptance Rate (by Lines) for Top 5 Languages"
          data={top5Languages.map(lang => ({
            name: lang.name,
            value: lang.acceptanceRateByLines,
            color: lang.color
          }))}
          dataKey="value"
          nameKey="name"
          colorKey="color"
          timeRange={languagesTimeRange}
          onTimeRangeChange={setLanguagesTimeRange}
          isPercentage
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Languages Data</h2>
        <DataTable
          columns={tableColumns}
          data={allLanguagesData}
        />
      </div>
    </div>
  );
};

export default Languages;