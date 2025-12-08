import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    API.get(`/listings/${id}`)
      .then((r) => setListing(r.data))
      .catch(() => {});
  }, [id]);

  if (!listing)
    return (
      <div className="container mt-4">
        <div className="text-center">Loading...</div>
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            <h2 className="mb-3">{listing.title}</h2>
            <p className="h4 text-success">₹{listing.price}</p>
            <p className="mb-3">{listing.description}</p>
            <p className="text-muted">
              Seller: {listing.seller?.name} ({listing.seller?.email})
            </p>
          </div>
        </div>
        <div className="col-md-4">
          {user && user.id !== listing.sellerId && (
            <div className="card p-3 shadow-sm">
              <h4 className="mb-3">💬 Chat with seller</h4>
              <Chat
                userId={user.id}
                otherUserId={listing.sellerId}
                listingId={listing.id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
