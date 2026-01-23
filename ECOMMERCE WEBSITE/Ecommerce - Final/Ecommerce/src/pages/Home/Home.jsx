import { useState, useEffect } from "react";

import Sidebar from "../../components/sidebar/CarSidebar";
import ListingCard from "../../components/cards/ListingCard";
import Footer from "../../components/footer/Footer";
import CategoryGrid from "../../components/category/CategoryGrid";

import { listings } from "../../data";
import "./Home.css";

export default function Home() {
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // RANDOM LISTINGS ON FIRST LOAD
  useEffect(() => {
    const shuffled = [...listings].sort(() => 0.5 - Math.random());
    setFilteredListings(shuffled);
  }, []);

  // WHEN CATEGORY ICON CLICKED
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    // FILTER BY CATEGORY (TEMP: TITLE BASED)
    const filtered = listings.filter((item) =>
      item.title.toLowerCase().includes(category.toLowerCase()),
    );

    setFilteredListings(filtered);
  };

  // FILTER FROM SIDEBAR (ONLY AFTER CATEGORY SELECTED)
  const applyFilters = (filters) => {
    let filtered = [...listings];

    // FIRST FILTER BY SELECTED CATEGORY
    if (selectedCategory) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }

    // LOCATION
    if (filters.location) {
      filtered = filtered.filter(
        (item) =>
          item.location &&
          item.location.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // FUEL
    if (filters.fuel) {
      filtered = filtered.filter((item) => item.fuel === filters.fuel);
    }

    // YEAR
    if (filters.year) {
      filtered = filtered.filter((item) => item.year === filters.year);
    }

    // BRAND
    if (filters.brand) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(filters.brand.toLowerCase()),
      );
    }

    // KM RANGE
    if (filters.km) {
      const [minKm, maxKm] = filters.km.includes("+")
        ? [Number(filters.km.replace("+", "")), Infinity]
        : filters.km.split("-").map(Number);

      filtered = filtered.filter((item) => {
        const kmNumber = Number(item.km.replace(/[^0-9]/g, ""));
        return kmNumber >= minKm && kmNumber <= maxKm;
      });
    }

    // BUDGET RANGE
    if (filters.budget) {
      const [minPrice, maxPrice] = filters.budget.includes("+")
        ? [Number(filters.budget.replace("+", "")), Infinity]
        : filters.budget.split("-").map(Number);

      filtered = filtered.filter((item) => {
        const priceNumber = Number(item.price.replace(/[^0-9]/g, ""));
        return priceNumber >= minPrice && priceNumber <= maxPrice;
      });
    }

    setFilteredListings(filtered);
  };

  return (
    <>
      <div className="home-page">
        <div
          className={`main-layout ${
            selectedCategory ? "with-sidebar" : "no-sidebar"
          }`}
        >
          {/* LEFT SIDEBAR — ONLY SHOW AFTER CATEGORY SELECT */}
          {selectedCategory && (
            <aside className="sidebar-wrapper">
              <Sidebar onFilterChange={applyFilters} />
            </aside>
          )}

          {/* RIGHT CONTENT */}
          <section className="listings">
            {/* CATEGORY GRID ALWAYS ON TOP */}
            <CategoryGrid onSelectCategory={handleCategorySelect} />

            <h2 className="home-title">
              {selectedCategory
                ? `${selectedCategory} Ads`
                : "Fresh Recommendations"}
            </h2>

            {filteredListings.length === 0 ? (
              <p className="no-results">No ads found for selected filters.</p>
            ) : (
              <div className="listings-grid">
                {filteredListings.map((item) => (
                  <ListingCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
