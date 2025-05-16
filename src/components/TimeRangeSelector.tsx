import React from 'react';
import { Button } from '@/components/ui/button';
import { TimeRange, getTimeRangeLabel } from '@/lib/utils';

interface TimeRangeSelectorProps {
  currentRange: TimeRange;
  onChange: (range: TimeRange) => void;
  className?: string;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  currentRange,
  onChange,
  className = '',
}) => {
  const ranges: TimeRange[] = ['28days', '6months', '1year', '5years', 'all'];
  const labels: Record<TimeRange, string> = {
    '28days': '1M',
    '6months': '6M',
    '1year': '1Y',
    '5years': '5Y',
    'all': 'All',
  };

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {ranges.map((range) => (
        <Button
          key={range}
          variant={currentRange === range ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(range)}
          className="px-3 py-1 text-xs"
        >
          {labels[range]}
        </Button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;