import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import { listings } from "../fav_data";
import { useNavigate } from "react-router-dom";

export default function Fav() {
    const [filteredListings, setFilteredListings] = useState(listings);

    const applyFilters = (filters) => {
        let filtered = listings;

        if (filters.category) {
            const categoryMap = {
                Cars: ["Wagon", "Amaze", "S-Cross", "i20", "Rapid"],
                Bikes: ["Splendor", "Classic"],
                Scooters: ["Jupiter", "Access"],
            };

            filtered = filtered.filter((item) =>
                categoryMap[filters.category]?.some((word) => item.title.includes(word))
            );
        }

        if (filters.location) {
            filtered = filtered.filter((item) => item.location === filters.location);
        }

        if (filters.year) {
            filtered = filtered.filter((item) => item.year === filters.year);
        }

        setFilteredListings(filtered);
    };

    useEffect(() => {
        setFilteredListings(listings);
    }, []);


    return (
        <div>
            <div className="main-layout">

                <Sidebar onFilterChange={applyFilters} />

                <section className="listings">
                    {filteredListings.map((item) => (
                        <ListingCard key={item.id} item={item} />
                    ))}
                </section>
            </div>

            <Footer />
        </div>
    );
}
