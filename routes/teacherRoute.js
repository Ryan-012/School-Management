const express = require("express");
const router = express.Router();
const teacherController = require("../Controllers/teacherController");
const auth = require("../Controllers/authController");

router.get("/", (req, res) => {
  res.render("loginTeacherTemplate.ejs", { error: false });
});

router.get(
  "/login",
  express.urlencoded({ extended: true }),
  teacherController.login
);

router.get("/dashboard", auth, teacherController.dashboard);

router.get("/info", auth, teacherController.info);

router.get("/class", auth, teacherController.myClass);

router.get("/class/message", auth, teacherController.loadMessage);

router.get("/class/notes", auth, teacherController.loadNotes);

router.get("/class/notes/edit", auth, teacherController.editNotes);

router.get("/myMessages", auth, teacherController.myMessages);

router.post(
  "/class/notes/save",
  express.urlencoded({ extended: true }),
  teacherController.saveNotes
);

router.post(
  "/class/message/save",
  express.urlencoded({ extended: true }),
  teacherController.createMessage
);

router.delete("/deleteMessage/:id", teacherController.deleteMessage);

module.exports = router;
