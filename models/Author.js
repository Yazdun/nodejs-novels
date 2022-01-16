const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    maxLength: 50,
    minlength: 2,
    unique: true,
  },
  birth: {
    type: Date,
    required: [true, "birth is required"],
  },
  death: {
    type: Date,
  },
  nationality: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: [true, "bio is required"],
    minLength: 10,
  },
  image: { type: String },
  stars: [],
});

AuthorSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  this.nationality = this.nationality.toLowerCase();
  next();
});

module.exports = mongoose.model("Author", AuthorSchema);
