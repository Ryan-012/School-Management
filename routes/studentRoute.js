const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/studentController");
const auth = require("../Controllers/authController");

router.get("/", (req, res) => {
  res.render("loginStudentTemplate.ejs", { error: false });
});

router.get(
  "/login",
  express.urlencoded({ extended: true }),
  studentController.loginStudent
);

router.get("/dashboard", auth, studentController.dashboard);

router.get("/info", auth, studentController.infoStudent);

router.get("/reportCard", auth, studentController.reportCard);

router.get("/simulateNotes", auth, studentController.simulateNotes);

router.get("/myMessages", auth, studentController.myMessages);

router.get(
  "/myMessages/createMessage",
  auth,
  studentController.loadMessageCreation
);

router.post(
  "/myMessages/create",
  express.urlencoded({ extended: true }),
  studentController.createMessage
);

router.delete("/deleteMessage/:id", studentController.deleteMessage);

module.exports = router;
