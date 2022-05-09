const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("hello express");
});

router.get("/member", (req, res) => {
  res.send("call member");
});

router.get("/member/:id", (req, res) => {
  const member = req.params.id;
  console.log(member);
  res.send(`${member}`);
});

module.exports = router;
