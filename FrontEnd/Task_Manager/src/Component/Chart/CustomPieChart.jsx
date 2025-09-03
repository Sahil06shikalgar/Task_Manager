import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import CustomTotip from './CustomTotip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
        className='text-center '
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={140}
          innerRadius={110}
          labelLine={false}
          
        >
            
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
          
        </Pie>
        <Tooltip content={<CustomTotip />} />
        <Legend content={<CustomLegend payload={data} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
