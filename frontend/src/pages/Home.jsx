import React from "react";
import ListingCard from "../components/ListingCard";
import "./Home.css";

const dummyListings = [
  {
    id: 1,
    title: "Honda City 2018",
    price: 850000,
    year: 2018,
    km: "50,000 km",
    location: "Mumbai",
    image: "/src/assets/car1.png",
  },
  {
    id: 2,
    title: "Maruti Swift 2020",
    price: 650000,
    year: 2020,
    km: "30,000 km",
    location: "Delhi",
    image: "/src/assets/car1.png",
  },
  {
    id: 3,
    title: "Hyundai Creta 2019",
    price: 1200000,
    year: 2019,
    km: "40,000 km",
    location: "Bangalore",
    image: "/src/assets/car2.png",
  },
  {
    id: 4,
    title: "Toyota Fortuner 2021",
    price: 2800000,
    year: 2021,
    km: "20,000 km",
    location: "Pune",
    image: "/src/assets/car2.png",
  },
  {
    id: 5,
    title: "Toyota Fortuner 2021",
    price: 2800000,
    year: 2021,
    km: "20,000 km",
    location: "Pune",
    image: "/src/assets/car2.png",
  },
  {
    id: 6,
    title: "Toyota Fortuner 2021",
    price: 2800000,
    year: 2021,
    km: "20,000 km",
    location: "Pune",
    image: "/src/assets/car2.png",
  },
  {
    id: 7,
    title: "Toyota Fortuner 2021",
    price: 2800000,
    year: 2021,
    km: "20,000 km",
    location: "Pune",
    image: "/src/assets/car2.png",
  },
  {
    id: 8,
    title: "Toyota Fortuner 2021",
    price: 2800000,
    year: 2021,
    km: "20,000 km",
    location: "Pune",
    image: "/src/assets/car2.png",
  },
];

export default function Home() {
  return (
    <>
      <div className="home-container">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <h3>Filters</h3>

          <select>
            <option>Category</option>
            <option>Cars</option>
            <option>Bikes</option>
            <option>Scooters</option>
          </select>

          <select>
            <option>Location</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Delhi</option>
          </select>

          <select>
            <option>Budget</option>
            <option>0 - 50,000</option>
            <option>50,001 - 1,00,000</option>
            <option>1,00,000+</option>
          </select>

          <select>
            <option>Brand / Model</option>
            <option>Toyota</option>
            <option>Honda</option>
            <option>Hyundai</option>
          </select>

          <select>
            <option>KM Driven</option>
            <option>0 - 10,000</option>
            <option>10,001 - 50,000</option>
          </select>

          <select>
            <option>Year</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>

          <select>
            <option>Fuel</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </aside>

        {/* LISTINGS */}
        <section className="listings">
          {dummyListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </section>
      </div>

      {/* Scroll to top */}
      <button
        id="topBtn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
