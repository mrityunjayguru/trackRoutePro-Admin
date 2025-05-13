import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Sentinel", devices: 2700 },
  { name: "MagTrack", devices: 3800 },
  { name: "GPS Max", devices: 3000 },
];

const RightDashboard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full max-w-xl">
      <h2 className="text-base text-black font-semibold mb-4">Client-wise Device Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#000000" }} />
          <YAxis tick={{ fontSize: 14, fill: "#000000" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
            labelStyle={{ color: "#333" }}
            itemStyle={{ color: "#000" }}
          />
          <Bar dataKey="devices" fill="#d4f300" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RightDashboard;
