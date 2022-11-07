const Teacher = require("../Models/teacherProfile");
const Student = require("../Models/studentProfile");
const Message = require("../Models/messageFormat");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenSecret = "192837b4rt983746ry4n029182739";
let currentToken = "";
let currentEmail = "";

const login = async (req, res) => {
  let body = req.query;
  try {
    let doc = await Teacher.findOne({
      "login.email": body["login.email"],
    });

    let comparePassword = bcrypt.compareSync(
      body["login.password"],
      doc.login.password
    );

    if (doc && comparePassword) {
      const token = jwt.sign(
        {
          email: body["login.email"],
          password: body["login.password"],
        },
        tokenSecret
      );
      currentToken = token;
      currentEmail = body["login.email"];
      res.redirect(`http://localhost:3000/teacher/dashboard/?token=${token}`);
    } else {
      res.render("loginTeacherTemplate", { error: true });
    }
  } catch (error) {
    res.render("loginTeacherTemplate", { error: true });
  }
};

const dashboard = async (req, res) => {
  try {
    let doc = await Teacher.findOne({ "login.email": currentEmail });
    if (doc) {
      res.render("teacherTemplate", {
        teacher: doc,
        token: currentToken,
        classes: doc.classes,
      });
    }
  } catch (error) {}
};

const info = async (req, res) => {
  try {
    let doc = await Teacher.findOne({ "login.email": currentEmail });

    if (doc) {
      res.render("infoTemplate", {
        teacher: doc,
        classes: doc.classes,
        token: currentToken,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const myClass = async (req, res) => {
  let turma = req.query.class;
  try {
    let doc = await Student.find({ class: turma });
    let doc2 = await Teacher.findOne({ "login.email": currentEmail });

    if (doc) {
      res.render("myClassTemplate", {
        students: doc,
        teacher: doc2,
        classes: doc2.classes,
        token: currentToken,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loadNotes = async (req, res) => {
  try {
    let doc = await Student.findById(req.query.student);
    let doc2 = await Teacher.findOne({ "login.email": currentEmail });

    if (doc && doc2) {
      res.render("notesMyStudent", {
        student: doc,
        teacher: doc2,
        notes: doc.notes[doc2.schoolDiscipline],
        classes: doc2.classes,
        token: currentToken,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const editNotes = async (req, res) => {
  try {
    let doc = await Student.findById(req.query.student);
    let doc2 = await Teacher.findOne({ "login.email": currentEmail });
    res.render("editNotesMyStudent", {
      student: doc,
      teacher: doc2,
      notes: doc.notes[doc2.schoolDiscipline],
      classes: doc2.classes,
      token: currentToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const saveNotes = async (req, res) => {
  try {
    let doc = await Student.findByIdAndUpdate(req.query.student, req.body);
    res.redirect(
      `http://localhost:3000/teacher/class/notes/?student=${req.query.student}&token=${currentToken}`
    );
  } catch (error) {
    console.log(error);
  }
};

const loadMessage = async (req, res) => {
  try {
    let doc = await Student.findById(req.query.student);
    let doc2 = await Teacher.findOne({ "login.email": currentEmail });

    if (doc) {
      res.render("createMessageTeacher", {
        student: doc,
        teacher: doc2,
        classes: doc2.classes,
        token: currentToken,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createMessage = async (req, res) => {
  let body = req.body;
  let message = new Message(body);

  try {
    let doc = await message.save();

    let teacher = await Teacher.findOne({ "login.email": currentEmail });
    let student = await Student.findById(req.query.student);
    res.render("messageCreatedTeacher", {
      teacher,
      student,
      token: currentToken,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

const myMessages = async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ "login.email": currentEmail });
    if (teacher) {
      let doc = await Message.find({
        messageTo: teacher.completeName + " | " + teacher.schoolDiscipline,
      });

      res.render("messagesTeacher", {
        teacher,
        classes: teacher.classes,
        message: doc,
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

module.exports = {
  login,
  dashboard,
  info,
  myClass,
  loadNotes,
  editNotes,
  saveNotes,
  loadMessage,
  createMessage,
  myMessages,
  deleteMessage,
};
