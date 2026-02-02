import api from "./api";

// 🔴 GET ALL LISTINGS (HOME PAGE)
export const getAllListings = async () => {
  const res = await api.get("/listings");
  return res.data;
};

// 🔴 GET SINGLE LISTING (PRODUCT DETAIL)
export const getListingById = async (id) => {
  const res = await api.get(`/listings/${id}`);
  return res.data;
};

// 🔴 CREATE NEW LISTING (SELL FORMS – WITH IMAGES)
export const createListing = async (formData) => {
  // formData must be FormData (multipart)
  const res = await api.post("/listings", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// 🔴 GET MY LISTINGS (PROFILE PAGE)
export const getMyListings = async () => {
  const res = await api.get("/listings/my");
  return res.data;
};

// 🔴 DELETE MY LISTING (OPTIONAL – LATER)
export const deleteListing = async (id) => {
  const res = await api.delete(`/listings/${id}`);
  return res.data;
};
