import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import { TimeRange } from '@/lib/utils';

interface PieChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  colorKey?: string;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  title?: string;
  height?: number;
  isPercentage?: boolean;
  colors?: string[];
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  dataKey,
  nameKey,
  colorKey,
  timeRange,
  onTimeRangeChange,
  title,
  height = 300,
  isPercentage = false,
  colors,
}) => {
  const defaultColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const formatValue = (value: number) => {
    return isPercentage ? `${value.toFixed(2)}%` : value;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border shadow-sm">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={renderCustomizedLabel}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorKey ? entry[colorKey] : colors ? colors[index % colors.length] : defaultColors[index % defaultColors.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={formatValue}
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                border: 'none' 
              }}
            />
            <Legend />
          </RechartsPieChart>
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

export default PieChart;