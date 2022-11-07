const Student = require("../Models/studentProfile");
const Message = require("../Models/messageFormat");
const Teacher = require("../Models/teacherProfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenSecret = "192837b4rt983746ry4n029182739";
let currentToken = "";
let currentEmail = "";

const loginStudent = async (req, res, next) => {
  let body = req.query;

  try {
    let doc = await Student.findOne({ "login.email": body["login.email"] });

    let comparePassword = bcrypt.compareSync(
      req.query["login.password"],
      doc.login.password
    );

    if (doc && comparePassword == true) {
      const token = jwt.sign(
        {
          email: body["login.email"],
          password: body["login.password"],
        },
        tokenSecret
      );
      currentToken = token;
      currentEmail = body["login.email"];
      res.redirect(`http://localhost:3000/student/dashboard/?token=${token}`);
    } else {
      res.render("loginStudentTemplate", { error: true });
    }
  } catch (error) {
    res.render("loginStudentTemplate", { error: true });
  }
};

const dashboard = async (req, res) => {
  try {
    let doc = await Student.findOne({ "login.email": currentEmail });
    if (doc) {
      res.render("studentTemplate", { student: doc, token: currentToken });
    }
  } catch (error) {}
};

const infoStudent = async (req, res) => {
  try {
    let doc = await Student.findOne({ "login.email": currentEmail });
    res.render("infoStudentTemplate", { student: doc, token: currentToken });
  } catch (error) {}
};

const reportCard = async (req, res) => {
  try {
    let doc = await Student.findOne({ "login.email": currentEmail });
    res.render("reportCardTemplate", { student: doc, token: currentToken });
  } catch (error) {}
};

const simulateNotes = async (req, res) => {
  try {
    let doc = await Student.findOne({ "login.email": currentEmail });
    res.render("simulateNotes", { student: doc, token: currentToken });
  } catch (error) {
    console.log(error);
  }
};

const myMessages = async (req, res) => {
  try {
    let student = await Student.findOne({ "login.email": currentEmail });
    if (student) {
      let doc = await Message.find({
        messageTo: student.completeName + " | " + student.class,
      });
      res.render("messagesStudent", {
        message: doc,
        student,
        token: currentToken,
      });
    }
  } catch (error) {}
};

const deleteMessage = async (req, res) => {
  let id = req.params.id;

  try {
    let doc = await Message.findByIdAndDelete(id);
    res.send(doc);
  } catch (error) {
    res.status(404).send(error);
  }
};

const loadMessageCreation = async (req, res) => {
  try {
    let students = await Student.find();
    let doc = await Student.findOne({ "login.email": currentEmail });
    let teachers = await Teacher.find();
    res.render("createMessageStudent", {
      student: doc,
      teachers,
      students,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const createMessage = async (req, res) => {
  let body = req.body;
  let message = new Message(body);

  try {
    let doc = await message.save();

    let student = await Student.findOne({ "login.email": currentEmail });
    res.render("messageCreatedStudent", { student, token: currentToken });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  loginStudent,
  dashboard,
  infoStudent,
  reportCard,
  simulateNotes,
  myMessages,
  loadMessageCreation,
  createMessage,
  deleteMessage,
};
