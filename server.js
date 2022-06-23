require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
// const fileUpload = require("express-fileupload");

const rtsIndex = require("./routes/index.router");

var app = express();

// middleware
// app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());

app.use("/", rtsIndex);

// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});
app.use(express.static(__dirname + "/testApp/dist/test-app/"));
// start server
// app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
app.listen(process.env.PORT || 7000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
