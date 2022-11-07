const PORT = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute");
const studentRoute = require("./routes/studentRoute");
const teacherRoute = require("./routes/teacherRoute");
const path = require("path");

mongoose.connect("mongodb://localhost:27017/schoolManagement");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database loaded!");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

app.get("/", (req, res) => {
  res.render("initialTemplate.ejs");
});

app.get("/employee", (req, res) => {
  res.render("employeeTemplate.ejs");
});

app.use("/admin", adminRoute);

app.use("/student", studentRoute);

app.use("/teacher", teacherRoute);

app.listen(PORT, () => {
  console.log("Server running...");
});
