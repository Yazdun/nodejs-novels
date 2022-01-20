const mongoose = require("mongoose");

const NovelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      maxLength: 50,
      minlength: 3,
    },
    author: {
      type: String,
      required: [true, "author's is required"],
      maxLength: 50,
      minlength: 2,
    },
    authorInfo: {
      type: mongoose.Types.ObjectId,
      ref: "Author",
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: 10,
    },
    pages: {
      type: Number,
      required: [true, "pages are required"],
    },
    publish: {
      type: Number,
      required: [true, "publish date is required"],
      maxLength: 4,
    },
    image: { type: String },
    likes: [],
  },
  { timestamps: true }
);

NovelSchema.pre("save", function (next) {
  this.title = this.title.toLowerCase();
  this.author = this.author.toLowerCase();
  next();
});

module.exports = mongoose.model("Novel", NovelSchema);
