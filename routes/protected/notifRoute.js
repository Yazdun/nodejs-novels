const express = require("express");
const router = express.Router();
const {
  isNotif,
  getAllNotifs,
} = require("../../controllers/protected/notifController");

router.get("/isNotif", isNotif);
router.get("/", getAllNotifs);

module.exports = router;
