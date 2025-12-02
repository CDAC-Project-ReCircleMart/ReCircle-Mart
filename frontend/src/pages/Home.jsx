import React, { useEffect, useState } from "react";
import API from "../api/api";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    API.get("/listings")
      .then((r) => setListings(r.data))
      .catch(() => {});
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Listings</h2>
      <div className="row">
        {listings.map((l) => (
          <div key={l.id} className="col-md-4 col-sm-6 mb-4">
            <ListingCard listing={l} />
          </div>
        ))}
      </div>
    </div>
  );
}
