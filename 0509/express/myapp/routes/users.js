var express = require("express");
const userSchema = require("../models/newuser");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("blog/auth");
});

router.post(
  "/signup",
  body("email").isEmail().withMessage("아이디는 email 형태를 따르셔야 합니다."),
  body("password").isLength({ min: 5 }).withMessage("비밀번호는 최소 5글자 이상입니다."),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const bcryptpw = bcrypt.hashSync(req.body.password, salt);

    userSchema
      .create({
        email: req.body.email,
        password: bcryptpw,
      })
      .then(result => {
        res.status(200).json(result);
      });
  }
);

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 가입을 했던 유저인지 아닌지
  const userdata = await userSchema.findOne({ email: email }).exec();

  if (!userdata) {
    // 유저데이터가 없다면
    return res.status(401).json({ msg: "가입되지 않은 계정입니다." });
  } else {
    // 유저데이터가 존재 -> 비밀번호 매칭
    const pwMatch = bcrypt.compareSync(password, userdata.password);
    if (pwMatch) {
      res.status(200).json({ msg: "OK" });
    } else {
      res.status(401).json({ msg: "비밀번호가 일치하지 않습니다." });
    }
  }
});

router.get("/login", (req, res) => {
  res.render("blog/login");
});

module.exports = router;
