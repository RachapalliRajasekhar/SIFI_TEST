const mongoose = require("mongoose");

const CustomArticleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  source: {
    id: { type: String },
    name: { type: String },
  },
  author: { type: String },
  title: { type: String },
  description: { type: String },
  url: { type: String },
  urlToImage: { type: String },
  publishedAt: { type: Date },
  content: { type: String },
});

module.exports = CustomArticle = mongoose.model(
  "CustomArticle",
  CustomArticleSchema
);
