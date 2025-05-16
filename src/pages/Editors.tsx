import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { getEditorsData } from '@/data/mockData';
import PieChart from '@/components/charts/PieChart';
import DataTable from '@/components/DataTable';

const Editors: React.FC = () => {
  const { editorsTimeRange, setEditorsTimeRange } = useUIStore();
  const editorsData = getEditorsData(editorsTimeRange);
  
  const tableColumns = [
    { key: 'name', header: 'Editor Name' },
    { key: 'acceptedPrompts', header: 'Accepted Prompts', isNumeric: true },
    { key: 'suggestedPrompts', header: 'Suggested Prompts', isNumeric: true },
    { key: 'acceptedLines', header: 'Accepted Lines', isNumeric: true },
    { key: 'suggestedLines', header: 'Suggested Lines', isNumeric: true },
    { key: 'acceptanceRateByLines', header: 'Acceptance Rate by Lines (%)', isNumeric: true, isPercentage: true }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PieChart
          title="Editors by Accepted Suggestions"
          data={editorsData}
          dataKey="acceptedPrompts"
          nameKey="name"
          colorKey="color"
          timeRange={editorsTimeRange}
          onTimeRangeChange={setEditorsTimeRange}
        />
        
        <PieChart
          title="Acceptance Rate (by Count) for Editors"
          data={editorsData.map(editor => ({
            name: editor.name,
            value: (editor.acceptedPrompts / editor.suggestedPrompts) * 100,
            color: editor.color
          }))}
          dataKey="value"
          nameKey="name"
          colorKey="color"
          timeRange={editorsTimeRange}
          onTimeRangeChange={setEditorsTimeRange}
          isPercentage
        />
        
        <PieChart
          title="Acceptance Rate (by Lines) for Editors"
          data={editorsData.map(editor => ({
            name: editor.name,
            value: editor.acceptanceRateByLines,
            color: editor.color
          }))}
          dataKey="value"
          nameKey="name"
          colorKey="color"
          timeRange={editorsTimeRange}
          onTimeRangeChange={setEditorsTimeRange}
          isPercentage
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Editors Data</h2>
        <DataTable
          columns={tableColumns}
          data={editorsData}
        />
      </div>
    </div>
  );
};

export default Editors;