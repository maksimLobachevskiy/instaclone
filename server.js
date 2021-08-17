const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/post");
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.use("/api/users", users);
app.use("/api/post", posts);
const db = require("./config/keys").mongoURI;
const uri = process.env.MONGODB_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => console.log("Mongo DB successfully connected")
);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server is up and running on port ${port}!`)
);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});








