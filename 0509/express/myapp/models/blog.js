const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

// autoIncrement 초기화
autoIncrement.initialize(mongoose);

const blog = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    no: Number,
  },
  {
    timestamps: true,
  }
);

blog.plugin(autoIncrement.plugin, {
  model: "blog",
  field: "no",
  startAt: 4,
  increment: 1,
});

const blogModel = mongoose.model("blog", blog);

module.exports = blogModel;
