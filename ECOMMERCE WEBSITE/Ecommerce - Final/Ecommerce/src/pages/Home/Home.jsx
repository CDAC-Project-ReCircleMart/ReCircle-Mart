import { useState, useEffect } from "react";

import CarSidebar from "../../components/sidebar/CarSidebar";
import BikeSidebar from "../../components/sidebar/BikeSidebar";
import MobileSidebar from "../../components/sidebar/MobileSidebar";
import ElectronicsSidebar from "../../components/sidebar/ElectronicsSidebar";
import FashionSidebar from "../../components/sidebar/FashionSidebar";
import FurnitureSidebar from "../../components/sidebar/FurnitureSidebar";
import PetsSidebar from "../../components/sidebar/PetsSidebar";
import SportsSidebar from "../../components/sidebar/SportsSidebar";

import ListingCard from "../../components/cards/ListingCard";
import Footer from "../../components/footer/Footer";
import CategoryGrid from "../../components/category/CategoryGrid";

import { listings } from "../../data";
import "./Home.css";

export default function Home() {
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // RANDOM LISTINGS ON FIRST LOAD
  useEffect(() => {
    const shuffled = [...listings].sort(() => 0.5 - Math.random());
    setFilteredListings(shuffled);
  }, []);

  // WHEN CATEGORY ICON CLICKED
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    // FILTER BY CATEGORY
    const filtered = listings.filter((item) => item.category === category);

    setFilteredListings(filtered);
  };

  // 🔥 FILTER FROM SIDEBAR (COMMON FOR ALL CATEGORIES)
  const applyFilters = (filters) => {
    let filtered = [...listings];

    // FIRST FILTER BY SELECTED CATEGORY
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // LOCATION
    if (filters.location) {
      filtered = filtered.filter(
        (item) =>
          item.location &&
          item.location.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // YEAR
    if (filters.year) {
      filtered = filtered.filter(
        (item) => String(item.year) === String(filters.year),
      );
    }

    // BRAND (TITLE BASED — works for Cars, Mobiles, etc.)
    if (filters.brand && selectedCategory !== "Fashion") {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(filters.brand.toLowerCase()),
      );
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

    // CATEGORY-SPECIFIC EXTRA FILTERS (Cars etc.)
    if (filters.fuel) {
      filtered = filtered.filter((item) =>
        item.description?.toLowerCase().includes(filters.fuel.toLowerCase()),
      );
    }

    if (filters.transmission) {
      filtered = filtered.filter((item) =>
        item.description
          ?.toLowerCase()
          .includes(filters.transmission.toLowerCase()),
      );
    }

    if (filters.owners) {
      filtered = filtered.filter((item) =>
        item.description?.toLowerCase().includes(`owners:${filters.owners}`),
      );
    }

    // 🔥🔥🔥 FASHION FILTERS (THIS IS THE FIX)
    if (selectedCategory === "Fashion") {
      // BRAND (FROM DESCRIPTION)
      if (filters.brand) {
        filtered = filtered.filter((item) =>
          item.description
            ?.toLowerCase()
            .includes(`brand:${filters.brand.toLowerCase()}`),
        );
      }

      // PRODUCT TYPE
      if (filters.productType) {
        filtered = filtered.filter((item) =>
          item.description
            ?.toLowerCase()
            .includes(`type:${filters.productType.toLowerCase()}`),
        );
      }

      // SIZE
      if (filters.size) {
        filtered = filtered.filter((item) =>
          item.description
            ?.toLowerCase()
            .includes(`size:${filters.size.toLowerCase()}`),
        );
      }

      // CONDITION
      if (filters.condition) {
        filtered = filtered.filter((item) =>
          item.description
            ?.toLowerCase()
            .includes(`condition:${filters.condition.toLowerCase()}`),
        );
      }
    }
    // 🔥🔥🔥 END FASHION FILTER FIX

    setCurrentPage(1);
    setFilteredListings(filtered);
  };

  /* ---------------- PAGINATION LOGIC ---------------- */

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentListings = filteredListings.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 🔥 DYNAMIC SIDEBAR LOADER
  const renderSidebar = () => {
    switch (selectedCategory) {
      case "Cars":
        return <CarSidebar onFilterChange={applyFilters} />;

      case "Bikes":
        return <BikeSidebar onFilterChange={applyFilters} />;

      case "Mobiles":
        return <MobileSidebar onFilterChange={applyFilters} />;

      case "Electronics":
        return <ElectronicsSidebar onFilterChange={applyFilters} />;

      case "Fashion":
        return <FashionSidebar onFilterChange={applyFilters} />;

      case "Furniture":
        return <FurnitureSidebar onFilterChange={applyFilters} />;

      case "Pets":
        return <PetsSidebar onFilterChange={applyFilters} />;

      case "Sports & Hobbies":
        return <SportsSidebar onFilterChange={applyFilters} />;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="home-page">
        <div
          className={`main-layout ${
            selectedCategory ? "with-sidebar" : "no-sidebar"
          }`}
        >
          {/* LEFT SIDEBAR */}
          {selectedCategory && (
            <aside className="sidebar-wrapper">{renderSidebar()}</aside>
          )}

          {/* RIGHT CONTENT */}
          <section className="listings">
            <CategoryGrid onSelectCategory={handleCategorySelect} />

            <h2 className="home-title">
              {selectedCategory
                ? `${selectedCategory} Ads`
                : "Fresh Recommendations"}
            </h2>

            {currentListings.length === 0 ? (
              <p className="no-results">No ads found for selected filters.</p>
            ) : (
              <>
                <div className="listings-grid">
                  {currentListings.map((item) => (
                    <ListingCard key={item.id} item={item} />
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                    >
                      Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          className={page === currentPage ? "active" : ""}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
