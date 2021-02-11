const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.NODE_PORT || 3000;
const album = require("./routes/album");
const artists = require("./routes/artists");
const transfer = require("./routes/transfer");
const index = require("./routes/index");
const API = require("./routes/api/api");

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/", index);
app.use("/album", album);
app.use("/artists", artists);
app.use("/transfer", transfer);
app.use("/api", cors(), API);

app.listen(port, () => {
  console.log("Node.js Express server listening on port " + port);
});
