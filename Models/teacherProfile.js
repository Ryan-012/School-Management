const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  completeName: { type: String, required: true },
  birthDate: {
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  telephoneNumber: {
    ddd: { type: Number, required: true },
    number: { type: Number, required: true },
  },
  schoolDiscipline: { type: String, required: true },
  classes: [Number],
  login: {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
});

module.exports = mongoose.model("teacher", teacherSchema);
