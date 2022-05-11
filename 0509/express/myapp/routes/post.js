const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("post");
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const date = req.body.date;
  res.json({ name: name, phone: phone, date: date });
});

module.exports = router;
