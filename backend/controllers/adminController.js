const { User, Listing } = require("../models");

exports.listPendingUsers = async (req, res) => {
  const users = await User.findAll({ where: { approved: false } });
  res.json(users);
};

exports.approveUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "Not found" });
  user.approved = true;
  await user.save();
  res.json({ message: "Approved" });
};

exports.listPendingListings = async (req, res) => {
  const listings = await Listing.findAll({ where: { approved: false } });
  res.json(listings);
};

exports.approveListing = async (req, res) => {
  const listing = await Listing.findByPk(req.params.id);
  if (!listing) return res.status(404).json({ message: "Not found" });
  listing.approved = true;
  await listing.save();
  res.json({ message: "Approved" });
};
