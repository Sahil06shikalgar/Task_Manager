import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell   
} from "recharts";

const CustomBarChart = ({ data }) => {

  const getbarColor = (entry) => {
    switch(entry?.priority) {
      case 'Low': return '#00C49F';
      case 'Medium': return '#FFBB28';
      case 'High': return '#FF8042';
      default: return '#0088FE';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const { priority, count } = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800">{priority}</p>
          <p className='text-sm text-gray-600'>
            Count:{" "}
            <span className='text-sm font-medium text-gray-900'>{payload[0].payload.count}
            {console.log("count",count)}
            </span>
           
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[95%] p-4 bg-white rounded-lg shadow-md">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="priority" tick={{ fontSize: 12, fill: "#555" }} stroke="yellow" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="red" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Legend />

          <Bar dataKey="count" nameKey="priority" fill="#FF8042" radius={[10,10,0,0]} activeDot={{ r: 8, fill: "yellow" }} activeStyle={{fill:"green"}} >
            {data.map((entry, index) => (
              <Cell key={index} fill={getbarColor(entry)} />
            ))}
           
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
