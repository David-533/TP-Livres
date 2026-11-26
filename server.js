require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const livresRoutes = require('./routes/livres');
const Livre = require('./model/livres');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/livres', livresRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connecté');

    if (await Livre.countDocuments() === 0) {
      await Livre.insertMany([
        { titre: 'Le Petit Prince', auteur: 'Saint-Exupéry', annee: 1943 },
        { titre: 'Les Misérables', auteur: 'Victor Hugo', annee: 1862 },
        { titre: "L'Étranger", auteur: 'Albert Camus', annee: 1942 }
      ]);
      console.log('Livres de départ ajoutés');
    }

    app.listen(process.env.PORT || 3000, () =>
      console.log(`API lancée sur le port ${process.env.PORT || 3000}`));
  })
  .catch(err => console.error('Erreur MongoDB :', err));