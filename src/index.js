const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./routes/web");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8888;

// inital route
initWebRoutes(app);

// connect db
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
