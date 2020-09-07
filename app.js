const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const spotifyToken = require("./middlewares/spotify.js");

const port = process.env.NODE_PORT || 3000;
const album = require("./routes/album");
const index = require("./routes/index");
const indexx = require("./routes/index");
const bolinho = require("./routes/index");

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/", index);
app.use("/album", album);

app.listen(port, () => {
	console.log("Node.js Express server listening on port " + port);
});
