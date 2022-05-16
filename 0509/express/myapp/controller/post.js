const BookSchema = require("../models/book");

const getBookInfo = (req, res) => {
  const { id } = req.params;
  BookSchema.find({ author: id })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
};

const addBook = (req, res) => {
  const { bookname, author, price, publish } = req.body;

  let bookData = new BookSchema({
    bookname: bookname,
    author: author,
    price: price,
    publish: publish,
  });

  bookData.save();
  res.redirect("/expost");
};

module.exports = {
  getBookInfo,
  addBook,
};
