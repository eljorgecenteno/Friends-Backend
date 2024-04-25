const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
