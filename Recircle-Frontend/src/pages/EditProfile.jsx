import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../providers/AuthProvider";

export default function EditProfile() {
    const { user, login } = useAuth()
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // ===== BASIC PROFILE =====
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [phone, setPhone] = useState(user?.phone || "");

    // ===== PROFILE PHOTO =====
    const [photoPreview, setPhotoPreview] = useState(
        user?.profilePhoto || "/default-user.png"
    );
    const [photoFile, setPhotoFile] = useState(null);

    // ===== ADDRESSES =====
    const [addresses, setAddresses] = useState(
        user.user?.profile?.addresses || []
    );

    // =========================
    const onPhotoSelect = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) return;

        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    // =========================
    const updateAddress = (index, field, value) => {
        const updated = [...addresses];
        if (field === "addressType") {
            updated[index].addressType = value;
        } else {
            updated[index].address[field] = value;
        }
        setAddresses(updated);
    };

    // =========================
    const addNewAddress = () => {
        setAddresses([
            ...addresses,
            {
                addressType: "OTHER",
                address: {
                    street: "",
                    city: "",
                    state: "",
                    pincode: "",
                    latitude: null,
                    longitude: null
                }
            }
        ]);
    };

    // =========================
    const removeAddress = (index) => {
        const updated = addresses.filter((_, i) => i !== index);
        setAddresses(updated);
    };

    // =========================
    const onSave = async () => {
        if (!fullName || !phone) {
            toast.warning("Full name and phone are required");
            return;
        }

        const updatedUser = {
            ...user,
            fullName,
            bio,
            phone,
            profilePhoto: photoPreview,
            profile: {
                ...user.profile,
                addresses
            }
        };

        /*
          🔥 Backend-ready (later)
          const formData = new FormData();
          formData.append("photo", photoFile);
          formData.append("user", JSON.stringify(updatedUser));
        */

        login(updatedUser);
        toast.success("Profile updated successfully");
        navigate("/profile");
    };

    // =========================
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-sm">
                        <div className="card-body">

                            <h4 className="text-center mb-4">Edit Profile</h4>

                            {/* ===== PROFILE PHOTO ===== */}
                            <div className="text-center mb-4">
                                <img
                                    src={photoPreview}
                                    alt=""
                                    className="rounded-circle"
                                    style={{
                                        width: 130,
                                        height: 130,
                                        objectFit: "cover",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => fileInputRef.current.click()}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    hidden
                                    onChange={onPhotoSelect}
                                />
                                <div className="text-muted small mt-1">
                                    Click photo to change
                                </div>
                            </div>

                            {/* ===== BASIC INFO ===== */}
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    className="form-control"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Bio</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Phone</label>
                                <input
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <hr />

                            {/* ===== ADDRESSES ===== */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Addresses</h5>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={addNewAddress}
                                >
                                    + Add Address
                                </button>
                            </div>

                            {addresses.length === 0 && (
                                <p className="text-muted">No address added</p>
                            )}

                            {addresses.map((addr, index) => (
                                <div key={index} className="border rounded p-3 mb-3">
                                    <div className="d-flex justify-content-between mb-2">
                                        <select
                                            className="form-select w-50"
                                            value={addr.addressType}
                                            onChange={(e) =>
                                                updateAddress(index, "addressType", e.target.value)
                                            }
                                        >
                                            <option value="HOME">Home</option>
                                            <option value="WORK">Work</option>
                                            <option value="OTHER">Other</option>
                                        </select>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => removeAddress(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <input
                                        className="form-control mb-2"
                                        placeholder="Street"
                                        value={addr.address.street}
                                        onChange={(e) =>
                                            updateAddress(index, "street", e.target.value)
                                        }
                                    />

                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <input
                                                className="form-control"
                                                placeholder="City"
                                                value={addr.address.city}
                                                onChange={(e) =>
                                                    updateAddress(index, "city", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <input
                                                className="form-control"
                                                placeholder="State"
                                                value={addr.address.state}
                                                onChange={(e) =>
                                                    updateAddress(index, "state", e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <input
                                        className="form-control"
                                        placeholder="Pincode"
                                        value={addr.address.pincode}
                                        onChange={(e) =>
                                            updateAddress(index, "pincode", e.target.value)
                                        }
                                    />
                                </div>
                            ))}

                            {/* ===== SAVE ===== */}
                            <div className="d-grid mt-4">
                                <button className="btn btn-primary" onClick={onSave}>
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}