const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const auth = require("../Controllers/authController");

router.get("/", (req, res) => {
  res.render("loginAdminTemplate", { error: false });
});
router.get(
  "/login",
  express.urlencoded({ extended: true }),
  adminController.loginAdmin
);

router.get("/createStudent", auth, (req, res) => {
  res.render("createStudentTemplate", {
    error: false,
    token: adminController.currentToken,
  });
});

router.get("/createTeacher", auth, (req, res) => {
  res.render("createTeacherTemplate", {
    error: false,
    token: adminController.currentToken,
  });
});

router.get("/manageTeachers", auth, adminController.manageTeachers);

router.get("/manageStudents", auth, adminController.manageStudents);

router.get("/myMessages/:name", auth, adminController.myMessages);

router.get(
  "/myMessages/createMessage/:name",
  adminController.loadMessageCreation
);

router.get("/manageStudents/edit/:id", auth, adminController.searchStudent);

router.get("/manageTeachers/edit/:id", auth, adminController.searchTeacher);

router.get("/myMessages/editMessage/:id", auth, adminController.searchMessage);

router.get("/manageTeachers/info/:id", auth, adminController.infoTeacher);

router.get("/manageStudents/info/:id", auth, adminController.infoStudent);

router.get(
  "/manageStudents/studentNotes/:id",
  auth,
  adminController.studentNotes
);

router.get(
  "/manageStudents/studentNotes/edit/:id",
  auth,
  adminController.editNotes
);
router.post(
  "/myMessages/create/:name",
  express.urlencoded({ extended: true }),
  adminController.createMessage
);

router.post(
  "/createStudent/addStudent",
  express.urlencoded({ extended: true }),
  adminController.createStudent
);

router.post(
  "/createTeacher/addTeacher",
  express.urlencoded({ extended: true }),
  adminController.createTeacher
);

router.post(
  "/manageStudents/edit/:id",
  express.urlencoded({ extended: true }),
  adminController.editStudent
);

router.post(
  "/myMessages/editMessage/:id",
  express.urlencoded({ extended: true }),
  adminController.editMessage
);

router.post(
  "/manageStudents/studentNotes/edit/:id",
  express.urlencoded({ extended: true }),
  adminController.saveNotes
);

router.post(
  "/manageTeachers/edit/:id",
  express.urlencoded({ extended: true }),
  adminController.editTeacher
);

router.delete("/deleteMessage/:id", adminController.deleteMessage);

router.delete("/deleteStudent/:id", adminController.deleteStudent);

router.delete("/deleteTeacher/:id", adminController.deleteTeacher);

module.exports = router;
