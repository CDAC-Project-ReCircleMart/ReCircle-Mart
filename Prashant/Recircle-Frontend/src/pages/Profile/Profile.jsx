
import React, { useState, useEffect } from "react";
// import './Profile.css'

export default function Profile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);

    setName(storedUser.name || "");
    setEmail(storedUser.email || "");
    setLocation(storedUser.location || "");
    setAddress(storedUser.address || "");
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, name, email, location, address };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user.name || "");
    setEmail(user.email || "");
    setLocation(user.location || "");
    setAddress(user.address || "");
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: "80px", height: "80px", fontSize: "32px" }}
                >
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
                <h4 className="mt-3 mb-0">{name || "User Name"}</h4>
                <small className="text-muted">{email || "Userh@gmail.com"}</small>
              </div>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                {isEditing ? (
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <div className="form-control bg-light">
                    {user.name || "Harsh Kumar"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <div className="form-control bg-light">
                    {user.email || "harsh@gmail.com"}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Location</label>
                {isEditing ? (
                  <input
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State"
                  />
                ) : (
                  <div className="form-control bg-light">
                    {user.location || "-"}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Address</label>
                {isEditing ? (
                  <textarea
                    className="form-control"
                    rows="2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                ) : (
                  <div className="form-control bg-light">
                    {user.address || "Hinjewadi Pune"}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="text-end">
                {isEditing ? (
                  <>
                    <button
                      className="btn btn-primary me-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary px-4"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
