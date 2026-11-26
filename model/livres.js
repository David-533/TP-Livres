const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  annee: Number,
  genre: String
}, { timestamps: true });

module.exports = mongoose.model('Livre', livreSchema);