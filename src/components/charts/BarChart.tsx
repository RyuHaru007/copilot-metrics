import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import { TimeRange } from '@/lib/utils';

interface BarChartProps {
  data: any[];
  dataKey: string;
  xAxisDataKey: string;
  name: string;
  color: string;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  title?: string;
  yAxisLabel?: string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  xAxisDataKey,
  name,
  color,
  timeRange,
  onTimeRangeChange,
  title,
  yAxisLabel,
  height = 300,
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-xl border shadow-sm">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis
              dataKey={xAxisDataKey}
              tickSize={0}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickSize={0}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: 'insideLeft',
                      offset: -5,
                      style: { textAnchor: 'middle', fontSize: 12 },
                    }
                  : undefined
              }
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                border: 'none' 
              }} 
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar
              dataKey={dataKey}
              name={name}
              fill={color}
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              barSize={30}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center">
        <TimeRangeSelector
          currentRange={timeRange}
          onChange={onTimeRangeChange}
        />
      </div>
    </div>
  );
};

export default BarChart;