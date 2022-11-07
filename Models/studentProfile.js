const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  completeName: { type: String, required: true },
  birthDate: {
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  class: { type: Number, required: true },
  login: {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },

  notes: {
    portuguese: {
      note1: { type: Number, default: 0 },
      note2: { type: Number, default: 0 },
      note3: { type: Number, default: 0 },
    },
    math: {
      note1: { type: Number, default: 0 },
      note2: { type: Number, default: 0 },
      note3: { type: Number, default: 0 },
    },
    history: {
      note1: { type: Number, default: 0 },
      note2: { type: Number, default: 0 },
      note3: { type: Number, default: 0 },
    },
    biology: {
      note1: { type: Number, default: 0 },
      note2: { type: Number, default: 0 },
      note3: { type: Number, default: 0 },
    },
    geography: {
      note1: { type: Number, default: 0 },
      note2: { type: Number, default: 0 },
      note3: { type: Number, default: 0 },
    },
    chemistry: {
      note1: { type: Number, default: 0 },
      note2: { type: Number, default: 0 },
      note3: { type: Number, default: 0 },
    },
    physics: {
      note1: { type: Number, default: 0 },
      note2: { type: Number, default: 0 },
      note3: { type: Number, default: 0 },
    },
    english: {
      note1: { type: Number, default: 0 },
      note2: { type: Number, default: 0 },
      note3: { type: Number, default: 0 },
    },
  },
  responsible: {
    completeName: { type: String, required: true },
    telephoneNumber: {
      ddd: { type: Number, required: true },
      number: { type: Number, required: true },
    },
    email: { type: String, required: true },
  },
});

module.exports = mongoose.model("student", studentSchema);
