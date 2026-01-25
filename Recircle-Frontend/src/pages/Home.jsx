import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import api from "../api/axios";

export default function Home() {
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get("/products")
      .then((res) => {
        setAllListings(res.data);
        setFilteredListings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const applyFilters = (filters) => {
    let filtered = [...allListings];

    if (filters.category) {
      filtered = filtered.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.location) {
      filtered = filtered.filter(
        (item) =>
          item.location &&
          item.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    if (filters.year) {
      filtered = filtered.filter(
        (item) => String(item.year) === String(filters.year)
      );
    }

    setFilteredListings(filtered);
  };

  return (
    <>
      <div className="main-layout">
        <Sidebar onFilterChange={applyFilters} />

        <section className="listings">
          {loading ? (
            <p className="loading-text">Loading listings...</p>
          ) : filteredListings.length > 0 ? (
            filteredListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))
          ) : (
            <p className="no-results">No listings found</p>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
