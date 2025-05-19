import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { getSeatAnalysisData } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DataTable from '@/components/DataTable';
import { TimeRange } from '@/lib/utils';

const InactiveUsers: React.FC = () => {
  const { seatAnalysisTimeRange, setSeatAnalysisTimeRange } = useUIStore();
  const data = getSeatAnalysisData(seatAnalysisTimeRange);
  
  const tableColumns = [
    { key: 'id', header: 'S. No' },
    { key: 'login', header: 'Login' },
    { key: 'githubId', header: 'GitHub ID' },
    { key: 'assigningTeam', header: 'Assigning Team' },
    { key: 'assignedTime', header: 'Assigned Time' },
    { key: 'lastActivityAt', header: 'Last Activity At' },
    { key: 'lastActivityEditor', header: 'Last Activity Editor' }
  ];

  const noActivityLabels: Record<TimeRange, string> = {
    '28days': '7 days',
    '6months': '14 days',
    '1year': '30 days',
    '5years': '60 days',
    'all': '90 days'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inactive Users</h1>
      
      <div className="flex justify-center">
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive users in the last {noActivityLabels[seatAnalysisTimeRange]}</CardTitle>
            <CardDescription className="text-xs">
             Inactivity Period of {noActivityLabels[seatAnalysisTimeRange]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-3xl font-bold tracking-tight text-red-600">
                {data.noActivityDays}
              </div>
              <Select 
                value={seatAnalysisTimeRange} 
                onValueChange={(value) => setSeatAnalysisTimeRange(value as TimeRange)}
              >
                <SelectTrigger className="h-7 text-xs w-full">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="28days">1 Week</SelectItem>
                  <SelectItem value="6months">1 Month</SelectItem>
                  <SelectItem value="1year">6 Months</SelectItem>
                  <SelectItem value="5years">1 Year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Inactive Users</h2>
        <DataTable
          columns={tableColumns}
          data={data.users}
        />
      </div>
    </div>
  );
};

export default InactiveUsers;