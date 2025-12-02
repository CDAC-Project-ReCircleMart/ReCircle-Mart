const { Listing } = require("../models");

exports.createListing = async (req, res) => {
  try {
    const { title, description, price, category, location } = req.body;
    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const listing = await Listing.create({
      title,
      description,
      price,
      images,
      category,
      location,
      sellerId: req.user.id,
    });
    return res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating listing" });
  }
};

exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      where: { approved: true, status: "available" },
      include: ["seller"],
    });
    return res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
};

exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id, {
      include: ["seller"],
    });
    if (!listing) return res.status(404).json({ message: "Not found" });
    return res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ message: "Not found" });
    if (listing.sellerId !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ message: "Not allowed" });
    const updates = req.body;
    if (req.files && req.files.length) {
      const imgs = req.files.map((f) => `/uploads/${f.filename}`);
      updates.images = JSON.stringify(imgs);
    }
    await listing.update(updates);
    return res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ message: "Not found" });
    if (listing.sellerId !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ message: "Not allowed" });
    await listing.update({ status: "removed" });
    return res.json({ message: "removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
};
