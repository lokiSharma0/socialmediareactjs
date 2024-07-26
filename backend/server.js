const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./databaseconn");
const userroute = require("./routes/users");
const authroute = require("./routes/auth");
const postrouts = require("./routes/post");

//middelweres
app.use(cors());
app.use(express.json());
app.use("/api/users", userroute);
app.use("/api/auth", authroute);
app.use("/api/post", postrouts);

//listening on port 5000
app.listen(6000, (req, res) => {
  console.log("Server connected to port 6000");
});
