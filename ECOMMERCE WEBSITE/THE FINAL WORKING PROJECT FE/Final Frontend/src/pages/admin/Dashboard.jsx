import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./Dashboard.css";

/* 🔹 TEMP DATA (LATER WE WILL REPLACE WITH API DATA) */

// Bar chart: users vs listings
const barData = [
  { name: "Users", total: 120 },
  { name: "Listings", total: 340 },
];

// Line chart: visits per day
const lineData = [
  { day: "Mon", visits: 20 },
  { day: "Tue", visits: 35 },
  { day: "Wed", visits: 40 },
  { day: "Thu", visits: 28 },
  { day: "Fri", visits: 50 },
  { day: "Sat", visits: 70 },
  { day: "Sun", visits: 65 },
];

// Pie chart: listings by category
const pieData = [
  { name: "Cars", value: 120 },
  { name: "Bikes", value: 80 },
  { name: "Electronics", value: 60 },
  { name: "Furniture", value: 40 },
  { name: "Others", value: 40 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

export default function Dashboard() {
  return (
    <div className="dashboard-root">
      <h3>Analytics Overview</h3>

      {/* ================= BAR CHART ================= */}
      <div className="chart-box">
        <h4>Total Users vs Listings</h4>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= LINE CHART ================= */}
      <div className="chart-box">
        <h4>User Visits (This Week)</h4>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PIE CHART ================= */}
      <div className="chart-box">
        <h4>Listings by Category</h4>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
