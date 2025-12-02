const express = require("express");
const { authenticate } = require("../middleware/auth");
const listingController = require("../controllers/listingController");

module.exports = (upload) => {
  const router = express.Router();

  router.post(
    "/",
    authenticate,
    upload.array("images"),
    listingController.createListing
  );
  router.get("/", listingController.getListings);
  router.get("/:id", listingController.getListing);
  router.put(
    "/:id",
    authenticate,
    upload.array("images"),
    listingController.updateListing
  );
  router.delete("/:id", authenticate, listingController.deleteListing);

  return router;
};
