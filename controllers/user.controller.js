const mongoose = require("mongoose");
const passport = require("passport");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("a5813d56377844fa9514e3ad80fee1fa");
const _ = require("lodash");

let express = require("express"),
  router = express.Router();

const { append } = require("express/lib/response");

const User = mongoose.model("User");
const Bookmarks = require("../models/Article");
const CustomArticle = require("../models/customArticle");

module.exports.register = (req, res, next) => {
  var user = new User();
  (user.firstName = req.body.firstName),
    (user.lastName = req.body.lastName),
    (user.email = req.body.email);
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send("This user Is already Existed");
      else return next(err);
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  req.body.email = req.body.email;
  req.body.password = req.body.password;
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) {
      //   res.redirect("/create");
      return res.status(200).json({ token: user.generateJwt() });
    }
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res.status(200).json({
        status: true,
        user: _.pick(user, [
          "firstName",
          "lastName",
          "email",
          "_id",
          "profilePic",
        ]),
      });
  });
};

module.exports.bookmarks = (req, res, next) => {
  let bookmarks = new Bookmarks({
    _id: new mongoose.Types.ObjectId(),
    source: req.body.source,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    urlToImage: req.body.urlToImage,
    publishedAt: req.body.publishedAt,
    content: req.body.content,
  });
  bookmarks.save((err, user) => {
    if (!err) {
      res.send(user);
    } else {
      res.send(err);
    }
  });
};
module.exports.customArticle = (req, res, next) => {
  let customArticle = new CustomArticle({
    _id: new mongoose.Types.ObjectId(),
    source: req.body.source,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    urlToImage: req.body.urlToImage,
    publishedAt: req.body.publishedAt,
    content: req.body.content,
  });
  customArticle.save((err, user) => {
    if (!err) {
      res.send(user);
    } else {
      res.send(err);
    }
  });
};
module.exports.getBookMarks = (req, res, next) => {
  Bookmarks.find({}, (err, art) => {
    res.send(art);
  });
};
module.exports.getArticles = (req, res, next) => {
  newsapi.v2
    .topHeadlines({
      category: "business",
      language: "en",
      country: "us",
    })
    .then((response) => {
      CustomArticle.find({}, (err, art) => {
        art.forEach((element) => {
          response.articles.push(element);
        });
        res.send(response);
      });
    });
};
module.exports.updateuser = (req, res, next) => {
  // var user = new User({});
  let usera = {};
  (usera.firstName = req.body.firstName),
    (usera.lastName = req.body.lastName),
    (usera.email = req.body.email),
    (usera.profilePic = req.file.filename),
    User.findByIdAndUpdate(req.body.id, usera, (err, user) => {
      if (!user)
        return res
          .status(404)
          .json({ status: false, message: "User record not found." });
      else
        return res.status(200).json({
          status: true,
          user: _.pick(user, [
            "firstName",
            "lastName",
            "email",
            "_id",
            "profilePic",
          ]),
        });
    });
};
module.exports.deleteProfilePic = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body._id,
    { profilePic: null },

    (err, dbres) => {
      res.send(dbres);
    }
  );
};
