import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { getSeatAnalysisData } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DataTable from '@/components/DataTable';
import { TimeRange, getTimeRangeLabel } from '@/lib/utils';

const SeatAnalysis: React.FC = () => {
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

  const timeRanges: TimeRange[] = ['28days', '6months', '1year', '5years', 'all'];
  const noActivityLabels: Record<TimeRange, string> = {
    '28days': '7 days',
    '6months': '14 days',
    '1year': '30 days',
    '5years': '60 days',
    'all': '90 days'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seat Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total assigned</CardTitle>
            <CardDescription className="text-xs">
              Currently assigned seats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-blue-600">
              {data.totalAssigned}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assigned but never used</CardTitle>
            <CardDescription className="text-xs">
              No show seats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-amber-600">
              {data.assignedNeverUsed}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">No Activity in the last {noActivityLabels[seatAnalysisTimeRange]}</CardTitle>
            <CardDescription className="text-xs">
              No use in the last {noActivityLabels[seatAnalysisTimeRange]}
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
        <h2 className="text-xl font-medium mb-4">Seat Usage Details</h2>
        <DataTable
          columns={tableColumns}
          data={data.users}
        />
      </div>
    </div>
  );
};

export default SeatAnalysis;