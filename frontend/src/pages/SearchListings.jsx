import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/api";
import ListingCard from "../components/ListingCard";

export default function SearchListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    if (query) {
      API.get(`/listings/search?q=${query}`)
        .then((r) => setListings(r.data))
        .catch(() => {});
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Search Listings</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for listings..."
          />
          <button className="btn btn-primary" type="submit">
            🔍 Search
          </button>
        </div>
      </form>
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
