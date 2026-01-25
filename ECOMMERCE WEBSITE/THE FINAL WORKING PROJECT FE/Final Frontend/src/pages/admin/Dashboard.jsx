import { useEffect, useState } from "react";
import api from "../../services/api";

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

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

export default function Dashboard() {
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  /* ================= FETCH BAR CHART ================= */
  useEffect(() => {
    const fetchBar = async () => {
      try {
        const res = await api.get("/admin/chart/users-listings");

        // MERGE USERS + LISTINGS BY DATE
        const merged = {};

        res.data.users.forEach((u) => {
          merged[u.date] = { date: u.date, users: u.users, listings: 0 };
        });

        res.data.listings.forEach((l) => {
          if (!merged[l.date]) {
            merged[l.date] = { date: l.date, users: 0, listings: l.listings };
          } else {
            merged[l.date].listings = l.listings;
          }
        });

        setBarData(Object.values(merged));
      } catch (err) {
        console.error("❌ BAR CHART ERROR:", err);
      }
    };

    fetchBar();
  }, []);

  /* ================= FETCH LINE CHART ================= */
  useEffect(() => {
    const fetchLine = async () => {
      try {
        const res = await api.get("/admin/chart/visits");

        const formatted = res.data.map((row) => ({
          date: row.date,
          visits: row.visits,
        }));

        setLineData(formatted);
      } catch (err) {
        console.error("❌ LINE CHART ERROR:", err);
      }
    };

    fetchLine();
  }, []);

  /* ================= FETCH PIE CHART ================= */
  useEffect(() => {
    const fetchPie = async () => {
      try {
        const res = await api.get("/admin/chart/categories");

        const formatted = res.data.map((row) => ({
          name: row.category,
          value: row.total,
        }));

        setPieData(formatted);
      } catch (err) {
        console.error("❌ PIE CHART ERROR:", err);
      }
    };

    fetchPie();
  }, []);

  return (
    <div className="dashboard-root">
      <h3>Analytics Overview</h3>

      {/* ================= BAR CHART ================= */}
      <div className="chart-box">
        <h4>Users vs Listings (By Date)</h4>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="users" fill="#6366f1" name="Users" />
            <Bar dataKey="listings" fill="#22c55e" name="Listings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= LINE CHART ================= */}
      <div className="chart-box">
        <h4>User Visits (Daily)</h4>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
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
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
