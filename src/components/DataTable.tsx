import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatNumber, formatPercent } from '@/lib/utils';

interface Column {
  key: string;
  header: string;
  isNumeric?: boolean;
  isPercentage?: boolean;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, className }) => {
  return (
    <div className={`w-full overflow-auto rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={column.isNumeric ? 'text-right' : ''}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((column) => (
                <TableCell
                  key={`${i}-${column.key}`}
                  className={`${column.isNumeric ? 'text-right' : ''} ${column.className || ''}`}
                >
                  {column.isNumeric
                    ? column.isPercentage
                      ? formatPercent(row[column.key])
                      : formatNumber(row[column.key])
                    : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;