import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./ManageListings.css";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

export default function ManageListings() {
  const [allListings, setAllListings] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 8;

  /* ================= FETCH LISTINGS ================= */
  const fetchListings = async () => {
    try {
      const res = await api.get("/admin/listings");
      setAllListings(res.data.listings || res.data || []);
    } catch (err) {
      toast.error("Failed to load listings");
      console.error("FETCH LISTINGS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  /* ================= STATS ================= */

  const totalListings = allListings.length;

  const categoryMap = {};
  allListings.forEach((l) => {
    const cat = l.category || "Other";
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  /* ================= SEARCH ================= */
  let filteredListings = allListings.filter((item) => {
    const text = `${item.id} ${item.title} ${item.category}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  /* ================= FILTER BY CATEGORY ================= */
  if (filterCategory !== "all") {
    filteredListings = filteredListings.filter(
      (l) => l.category === filterCategory,
    );
  }

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredListings.length / limit);
  const start = (page - 1) * limit;
  const currentListings = filteredListings.slice(start, start + limit);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;

    try {
      await api.delete(`/admin/listings/${id}`);
      toast.success("Listing deleted");
      setAllListings(allListings.filter((l) => l.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const categories = ["all", ...Object.keys(categoryMap)];

  return (
    <div className="listings-root">
      <h3>Manage Listings</h3>

      {/* ================= STATS BLOCKS ================= */}
      <div className="stats-grid">
        <div className="stat-card purple">
          <span>Total Listings</span>
          <strong>{totalListings}</strong>
        </div>

        {Object.keys(categoryMap)
          .slice(0, 3)
          .map((cat, index) => (
            <div key={cat} className={`stat-card card-${index}`}>
              <span>{cat}</span>
              <strong>{categoryMap[cat]}</strong>
            </div>
          ))}
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
              innerRadius={70}
              outerRadius={120}
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

      <hr />

      {/* ================= SEARCH BAR ================= */}
      <div className="listings-top">
        <input
          type="text"
          placeholder="Search by ID, name or category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* ================= CATEGORY FILTER PILLS ================= */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filterCategory === cat ? "active" : ""}
            onClick={() => {
              setFilterCategory(cat);
              setPage(1);
            }}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="listings-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Date Added</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentListings.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No listings found
                </td>
              </tr>
            ) : (
              currentListings.map((item) => {
                const imageSrc = item.image
                  ? item.image.startsWith("/uploads")
                    ? `http://localhost:8080${item.image}`
                    : item.image
                  : "/no-image.png";

                return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="listing-avatar"
                      />
                    </td>

                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>₹ {item.price}</td>

                    <td className="action-icons">
                      <i
                        className="fa-solid fa-trash delete-icon"
                        onClick={() => handleDelete(item.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
