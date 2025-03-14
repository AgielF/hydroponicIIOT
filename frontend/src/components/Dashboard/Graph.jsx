
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

const Graph = ({ data, lines, xAxisKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 0, right: 0, left: -24, bottom: 0 }}
      >
        <CartesianGrid stroke="#e4e4e7" />
        <XAxis
          dataKey={xAxisKey}
          axisLine={false}
          tickLine={false}
          padding={{ right: 4 }}
        />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          wrapperClassName="text-sm rounded"
          labelClassName="text-xs text-stone-500"
        />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
