import React from 'react';
import { BaseChart } from './BaseChart';

interface CardiovascularRiskChartProps {
  data: {
    score: number;
    risk: 'low' | 'moderate' | 'high';
    details?: Array<{ label: string; value: number }>;
  };
}

export const CardiovascularRiskChart: React.FC<CardiovascularRiskChartProps> = ({ data }) => {
  const pieData = [
    {
      id: 'Risco',
      label: data.risk,
      value: data.score,
      color: data.risk === 'high' ? '#EF4444' : 
             data.risk === 'moderate' ? '#F59E0B' : '#10B981'
    }
  ];

  const barData = data.details?.map(detail => ({
    factor: detail.label,
    value: detail.value,
    color: '#3B82F6'
  })) || [];

  return (
    <div className="space-y-8">
      <div className="h-64">
        <BaseChart
          type="pie"
          data={pieData}
          height={250}
        />
      </div>
      
      {data.details && data.details.length > 0 && (
        <div className="h-64">
          <BaseChart
            type="bar"
            data={barData}
            height={250}
          />
        </div>
      )}
    </div>
  );
};
