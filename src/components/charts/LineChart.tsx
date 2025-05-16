import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import { TimeRange } from '@/lib/utils';

interface LineConfig {
  dataKey: string;
  name: string;
  color: string;
  strokeWidth?: number;
}

interface LineChartProps {
  data: any[];
  lines: LineConfig[];
  xAxisDataKey: string;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  title?: string;
  yAxisLabel?: string;
  height?: number;
  isPercentage?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisDataKey,
  timeRange,
  onTimeRangeChange,
  title,
  yAxisLabel,
  height = 300,
  isPercentage = false,
}) => {
  const formatYAxis = (value: number) => (isPercentage ? `${value}%` : value);

  return (
    <div className="w-full bg-white p-4 rounded-xl border shadow-sm">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
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
              tickFormatter={formatYAxis}
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
              formatter={(value: number) => isPercentage ? `${value.toFixed(2)}%` : value}
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                border: 'none' 
              }} 
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            {lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth || 2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={800}
              />
            ))}
          </RechartsLineChart>
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

export default LineChart;