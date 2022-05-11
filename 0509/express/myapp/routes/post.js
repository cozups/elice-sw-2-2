const express = require("express");
const BookSchema = require("../models/book");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("post");
});

router.get("/del", (req, res) => {
  res.render("delete");
});

router.get("/bookinfo/:id", (req, res) => {
  const authorname = req.params.id;

  // BookSchema.find({ author: authorname }, (err, result) => {
  //   if (result) {
  //     return res.json(result);
  //   } else {
  //     return res.send("등록된 작가가 없습니다");
  //   }
  // });
  BookSchema.find({ author: authorname })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/del/:id", (req, res) => {
  const bookname = req.params.id;
  BookSchema.findOneAndDelete({ bookname: bookname })
    .then(result => {
      res.json({ redirect: "/expost" });
    })
    .catch(err => {
      console.log(err);
    });
});

// router.post("/", (req, res, next) => {
//   const name = req.body.name;
//   const phone = req.body.phone;
//   const date = req.body.date;

//   // 웹 통신 방식 1요청 1응답 -> 통신 종료되는게 정상
//   res.json({ name: name, phone: phone, date: date });

//   // next();
// });

//  '/' ==> expost/addbook
router.post("/addbook", (req, res) => {
  const bookname = req.body.bookname;
  const author = req.body.author;
  const price = req.body.price;
  const publish = req.body.publish;

  let bookData = new BookSchema({
    bookname: bookname,
    author: author,
    price: price,
    publish: publish,
  });

  bookData.save();
  res.redirect("/expost");
});

// router.post("/", (req, res) => {
//   res.redirect("/expost");
// });

module.exports = router;
