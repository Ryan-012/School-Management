const Student = require("../Models/studentProfile");
const Teacher = require("../Models/teacherProfile");
const Message = require("../Models/messageFormat");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenSecret = "192837b4rt983746ry4n029182739";
let currentToken = "";
const loginAdmin = (req, res) => {
  if (req.query.user == "admin" && req.query.password == "123456") {
    const token = jwt.sign(
      {
        user: req.query.user,
        password: req.query.password,
      },
      tokenSecret
    );
    currentToken = token;

    res.render("adminTemplate", { token });
  } else {
    res.render("loginAdminTemplate", { error: true });
  }
};

const createMessage = async (req, res) => {
  let message = new Message(req.body);
  let name = req.params.name;

  try {
    let doc = await message.save();
    res.render("messageCreatedSuccessfully", { name, token: currentToken });
  } catch (error) {
    res.status(404).send(error);
  }
};

const createStudent = async (req, res) => {
  let body = await req.body;

  const selectedStudent = await Student.findOne({
    "login.email": body["login.email"],
  });

  if (selectedStudent) {
    res.render("createStudentTemplate", { error: true });
  } else {
    body["login.password"] = bcrypt.hashSync(body["login.password"]);

    let student = new Student(body);
    try {
      let doc = await student.save();
      res.render("createdSuccessTemplate");
    } catch (error) {
      res.status(404).send(error);
    }
  }
};

const createTeacher = async (req, res) => {
  let body = await req.body;

  const selectedTeacher = await Teacher.findOne({
    "login.email": body["login.email"],
  });
  if (selectedTeacher) {
    res.render("createTeacherTemplate", { error: true, body });
  } else {
    body["login.password"] = bcrypt.hashSync(body["login.password"]);

    let teacher = new Teacher(body);
    try {
      let doc = await teacher.save();
      if (doc) {
        res.render("createdSuccessTemplate");
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }
};

const manageTeachers = async (req, res) => {
  try {
    let docs = await Teacher.find();
    res.render("manageTeachersTemplate", {
      teachers: docs,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const manageStudents = async (req, res) => {
  try {
    let docs = await Student.find();
    res.render("manageStudentsTemplate", {
      students: docs,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const myMessages = async (req, res) => {
  let messageTo = req.params.name;
  let createBy = req.params.name;
  try {
    let doc = await Message.find({ messageTo });
    let doc2 = await Message.find({ createBy });
    res.status(200).render("myMessagesTemplate", {
      messageTo: doc,
      createBy: doc2,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const loadMessageCreation = async (req, res) => {
  let name = req.params.name;

  try {
    let student = await Student.find();
    let teacher = await Teacher.find();
    res.render("createMessage", {
      name,
      student,
      teacher,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMessage = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    let doc = await Message.findByIdAndDelete(id);
    res.send(doc);
  } catch (error) {
    res.status(404).send(error);
  }
};
const deleteTeacher = async (req, res) => {
  let id = req.params.id;
  try {
    let doc = await Teacher.findByIdAndDelete(id);

    res.send(id);
  } catch (error) {
    res.status(404).send(error);
  }
};
const deleteStudent = async (req, res) => {
  let id = req.params.id;

  try {
    let doc = await Student.findByIdAndDelete(id);
    res.send(doc);
  } catch (error) {
    res.status(404).send(error);
  }
};
const searchStudent = async (req, res, next) => {
  let _id = req.params.id;
  try {
    let doc = await Student.findOne({ _id });
    res.render("editStudentTemplate.ejs", {
      student: doc,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const searchTeacher = async (req, res, next) => {
  let _id = req.params.id;
  try {
    let doc = await Teacher.findOne({ _id });
    res.render("editTeacherTemplate.ejs", {
      teacher: doc,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const searchMessage = async (req, res) => {
  let _id = req.params.id;
  try {
    let message = await Message.findOne({ _id });
    let student = await Student.find();
    let teacher = await Teacher.find();

    res.render("editMessageTemplate.ejs", {
      message,
      student,
      teacher,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const studentNotes = async (req, res, next) => {
  let _id = req.params.id;
  try {
    let doc = await Student.findOne({ _id });
    res.render("studentNotesTemplate.ejs", {
      student: doc,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};
const editNotes = async (req, res) => {
  let _id = req.params.id;
  try {
    let doc = await Student.findOne({ _id });
    res.render("editNotes.ejs", { student: doc, token: currentToken });
  } catch (error) {
    console.log(error);
  }
};

const saveNotes = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }
  try {
    let doc = await Student.findByIdAndUpdate({ _id: id }, req.body);
    res.redirect(
      `http://localhost:3000/admin/manageStudents/studentNotes/${id}/?token=${currentToken}`
    );
  } catch (error) {
    console.log(error);
  }
};

const infoTeacher = async (req, res) => {
  let _id = req.params.id;
  try {
    let doc = await Teacher.findOne({ _id });

    res.render("infoTeacher.ejs", { teacher: doc, token: currentToken });
  } catch (error) {
    console.log(error);
  }
};

const infoStudent = async (req, res) => {
  let _id = req.params.id;
  try {
    let doc = await Student.findOne({ _id });
    res.render("infoStudent.ejs", { student: doc, token: currentToken });
  } catch (error) {
    console.log(error);
  }
};

const editStudent = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  if (req.body["login.password"] == "") {
    let student = await Student.findOne({ _id: id });

    req.body["login.password"] = student?.login?.password;
  } else {
    req.body["login.password"] = bcrypt.hashSync(req.body["login.password"]);
  }

  try {
    let doc = await Student.findByIdAndUpdate({ _id: id }, req.body);
    res.redirect(
      `http://localhost:3000/admin/manageStudents/?token=${currentToken}`
    );
  } catch (error) {
    console.log(error);
  }
};

const editTeacher = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }

  if (req.body["login.password"] == "") {
    let teacher = await Teacher.findOne({ _id: id });

    req.body["login.password"] = teacher?.login?.password;
  } else {
    req.body["login.password"] = bcrypt.hashSync(req.body["login.password"]);
  }
  try {
    let doc = await Teacher.findByIdAndUpdate(id, req.body);

    res.redirect(
      `http://localhost:3000/admin/manageTeachers/?token=${currentToken}`
    );
  } catch (error) {
    console.log(error);
  }
};

const editMessage = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    id = req.body.id;
  }
  try {
    let doc = await Message.findByIdAndUpdate(id, req.body);
    res.redirect(
      `http://localhost:3000/admin/myMessages/Admin/?token=${currentToken}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMessage,
  createStudent,
  createTeacher,
  manageTeachers,
  manageStudents,
  loginAdmin,
  deleteMessage,
  deleteStudent,
  deleteTeacher,
  myMessages,
  loadMessageCreation,
  searchStudent,
  searchTeacher,
  searchMessage,
  editStudent,
  editTeacher,
  editMessage,
  infoTeacher,
  infoStudent,
  studentNotes,
  editNotes,
  saveNotes,
  currentToken,
};
