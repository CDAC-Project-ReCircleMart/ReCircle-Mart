const express = require("express");
const { authenticate } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.use(authenticate);
router.use(isAdmin);

router.get("/users", adminController.getUsers);
router.put("/users/:id/approve", adminController.approveUser);
router.get("/listings", adminController.getListings);
router.put("/listings/:id/approve", adminController.approveListing);

module.exports = router;
