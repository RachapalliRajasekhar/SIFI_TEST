const express = require("express");
const router = express.Router();
const ctrlUser = require("../controllers/user.controller");
const multer = require("multer");
const jwtHelper = require("../config/jwtHelper");
const { append } = require("express/lib/response");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./SIFY_Test_Frontend/src/assets/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, "profilepic" + "-" + uniqueSuffix);
  },
});
// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/octet-stream"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
router.post("/signup", ctrlUser.register);
router.post("/signin", ctrlUser.authenticate);
router.post("/bookmarks", ctrlUser.bookmarks);
router.post("/customArticle", ctrlUser.customArticle);
router.get("/getBookMarks", ctrlUser.getBookMarks);
router.get("/getArticles", ctrlUser.getArticles);
router.get("/userProfile", jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put("/updateprofile", upload.single("file"), ctrlUser.updateuser);
router.post("/deleteProfilePic", ctrlUser.deleteProfilePic);

module.exports = router;
