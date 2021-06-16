const express = require("express");
const app = express();
const port = process.env.port || 8300;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static("www"));

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
