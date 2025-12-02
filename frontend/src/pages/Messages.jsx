import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Messages() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      API.get(`/messages/conversations/${user.id}`)
        .then((r) => setConversations(r.data))
        .catch(() => {});
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Messages</h2>
      <div className="row">
        {conversations.map((c) => (
          <div key={c.id} className="col-md-6 mb-3">
            <div className="card p-3 shadow-sm">
              <h5 className="card-title">📦 Listing: {c.listing.title}</h5>
              <p className="card-text">👤 With: {c.otherUser.name}</p>
              <p className="card-text text-muted">
                💬 Last message: {c.lastMessage}
              </p>
              <Link to={`/listings/${c.listingId}`} className="btn btn-primary">
                Go to Chat
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
