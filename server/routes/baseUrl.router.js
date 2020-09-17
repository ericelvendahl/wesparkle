const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(process.env.BASE_URL);
});

module.exports = router;
