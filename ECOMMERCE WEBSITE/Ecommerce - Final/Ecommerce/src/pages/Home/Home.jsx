// /**
//  * Home.jsx
//  * Home / landing page
//  * Uses Sidebar filters and Listing cards
//  * UI-first, backend later
//  */

// import { useState } from "react";

// // Working component paths (CONFIRMED)
// import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import ListingCard from "../../components/cards/ListingCard";
// import Footer from "../../components/footer/Footer";

// // Temporary mock data
// import { listings } from "../../data";

// export default function Home() {
//   const [filteredListings, setFilteredListings] = useState(listings);

//   // Apply filters from Sidebar
//   const applyFilters = (filters) => {
//     let filtered = listings;

//     if (filters.category) {
//       const categoryMap = {
//         Cars: ["Wagon", "Amaze", "S-Cross", "i20", "Rapid"],
//         Bikes: ["Splendor", "Classic"],
//         Scooters: ["Jupiter", "Access"],
//       };

//       filtered = filtered.filter((item) =>
//         categoryMap[filters.category]?.some((word) =>
//           item.title.includes(word),
//         ),
//       );
//     }

//     if (filters.location) {
//       filtered = filtered.filter((item) => item.location === filters.location);
//     }

//     if (filters.year) {
//       filtered = filtered.filter((item) => item.year === filters.year);
//     }

//     setFilteredListings(filtered);
//   };

//   return (
//     <>
//       {/* Top navigation */}
//       <Navbar />

//       {/* Sidebar + Listings layout */}
//       <div className="main-layout">
//         <Sidebar onFilterChange={applyFilters} />

//         <section className="listings pe-4">
//           {filteredListings.length === 0 ? (
//             <p>No listings found</p>
//           ) : (
//             filteredListings.map((item) => (
//               <ListingCard key={item.id} item={item} />
//             ))
//           )}
//         </section>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </>
//   );
// }

/**
 * Home.jsx
 * - Shows sidebar + listings
 * - Listings use ListingCard
 * - Like button works (via FavouritesContext)
 */

import { useState, useEffect } from "react";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ListingCard from "../../components/cards/ListingCard";
import Footer from "../../components/footer/Footer";

import { listings } from "../../data"; // your existing data

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
      <Navbar />

      <div className="main-layout">
        <Sidebar onFilterChange={applyFilters} />

        <section className="listings">
          <div className="row">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ListingCard item={item} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
