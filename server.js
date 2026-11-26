require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const livresRoutes = require('./routes/livres');

const app = express();
app.use(express.json());
app.use('/livres', livresRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(process.env.PORT || 3000, () =>
      console.log(`API lancée sur le port ${process.env.PORT || 3000}`));
  })
  .catch(err => console.error('Erreur MongoDB :', err));