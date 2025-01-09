import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface BaseChartProps {
  type: 'line' | 'pie' | 'bar';
  data: any;
  height?: number;
  isLoading?: boolean;
}

export const BaseChart: React.FC<BaseChartProps> = ({
  type,
  data,
  height = 400,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const commonProps = {
    margin: { top: 50, right: 110, bottom: 50, left: 60 },
    animate: true,
    theme: {
      fontSize: 12,
      textColor: '#374151',
      axis: {
        domain: {
          line: {
            stroke: '#E5E7EB'
          }
        },
        ticks: {
          line: {
            stroke: '#E5E7EB'
          }
        }
      },
      grid: {
        line: {
          stroke: '#F3F4F6'
        }
      }
    }
  };

  switch (type) {
    case 'line':
      return (
        <div style={{ height }}>
          <ResponsiveLine
            data={data}
            {...commonProps}
            enablePoints
            pointSize={8}
            pointColor="#ffffff"
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enableGridX={false}
            enableArea
            areaOpacity={0.1}
            useMesh
            crosshairType="cross"
          />
        </div>
      );

    case 'pie':
      return (
        <div style={{ height }}>
          <ResponsivePie
            data={data}
            {...commonProps}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            arcLinkLabelsSkipAngle={10}
            arcLabelsSkipAngle={10}
          />
        </div>
      );

    case 'bar':
      return (
        <div style={{ height }}>
          <ResponsiveBar
            data={data}
            {...commonProps}
            padding={0.3}
            borderRadius={4}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="#ffffff"
            role="application"
          />
        </div>
      );

    default:
      return null;
  }
};
