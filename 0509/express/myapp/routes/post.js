const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("post");
});

router.post("/", (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const date = req.body.date;

  // 웹 통신 방식 1요청 1응답 -> 통신 종료되는게 정상
  // res.json({ name: name, phone: phone, date: date });

  next();
});

router.post("/", (req, res) => {
  res.redirect("/expost");
});

module.exports = router;
