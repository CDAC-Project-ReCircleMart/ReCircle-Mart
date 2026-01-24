// controllers/listingController.js

const db = require("../config/db");

// 🔴 CREATE LISTING (POST /api/listings)
exports.createListing = async (req, res) => {
  try {
    const { title, price, category, subcategory, location, year, description } =
      req.body;

    const sellerId = req.user.id; // from authMiddleware

    // Save images paths
    const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const [result] = await db.query(
      `INSERT INTO listings 
      (title, price, category, subcategory, location, year, description, seller_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        price,
        category,
        subcategory,
        location,
        year,
        description,
        sellerId,
      ],
    );

    const listingId = result.insertId;

    // Save images
    for (let img of images) {
      await db.query(
        "INSERT INTO listing_images (listing_id, image_path) VALUES (?, ?)",
        [listingId, img],
      );
    }

    res.json({ message: "Listing created successfully", id: listingId });
  } catch (err) {
    console.error("❌ Create listing error:", err);
    res.status(500).json({ message: "Failed to create listing" });
  }
};

// 🔴 GET ALL LISTINGS (HOME PAGE)
exports.getAllListings = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT l.*, 
      (SELECT image_path FROM listing_images WHERE listing_id = l.id LIMIT 1) AS image
      FROM listings l
      ORDER BY l.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ Get listings error:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

// 🔴 GET SINGLE LISTING (PRODUCT DETAIL)
exports.getSingleListing = async (req, res) => {
  try {
    const { id } = req.params;

    const [[listing]] = await db.query(
      `SELECT l.*, u.first_name, u.avatar 
       FROM listings l 
       JOIN users u ON l.seller_id = u.id
       WHERE l.id = ?`,
      [id],
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const [images] = await db.query(
      "SELECT image_path FROM listing_images WHERE listing_id = ?",
      [id],
    );

    listing.images = images.map((img) => img.image_path);
    listing.seller = {
      id: listing.seller_id,
      name: listing.first_name,
      avatar: listing.avatar,
    };

    res.json(listing);
  } catch (err) {
    console.error("❌ Get single listing error:", err);
    res.status(500).json({ message: "Failed to fetch listing" });
  }
};

// 🔴 GET USER LISTINGS (PROFILE PAGE)
exports.getMyListings = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT l.*, 
      (SELECT image_path FROM listing_images WHERE listing_id = l.id LIMIT 1) AS image
      FROM listings l WHERE seller_id = ?`,
      [userId],
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ My listings error:", err);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
};
