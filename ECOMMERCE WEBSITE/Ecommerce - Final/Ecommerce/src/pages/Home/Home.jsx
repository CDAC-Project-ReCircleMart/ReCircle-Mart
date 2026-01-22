import { useState, useEffect } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import ListingCard from "../../components/cards/ListingCard";
import Footer from "../../components/footer/Footer";

import { listings } from "../../data";
import "./Home.css";

export default function Home() {
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    setFilteredListings(listings);
  }, []);

  const applyFilters = (filters) => {
    let filtered = listings;

    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter((item) => item.location === filters.location);
    }

    setFilteredListings(filtered);
  };

  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="home-page">
        <div className="main-layout">
          {/* LEFT SIDEBAR */}
          <aside className="sidebar-wrapper">
            <Sidebar onFilterChange={applyFilters} />
          </aside>

          {/* RIGHT LISTINGS AREA */}
          <section className="listings">
            <h2 className="home-title">Fresh Recommendations</h2>

            <div className="listings-grid">
              {filteredListings.map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
