const express = require('express');
const Livre = require('../model/livres');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json(await Livre.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) return res.status(404).json({ message: 'Livre introuvable' });
    res.json(livre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const livre = await Livre.create(req.body);
    res.status(201).json(livre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!livre) return res.status(404).json({ message: 'Livre introuvable' });
    res.json(livre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre) return res.status(404).json({ message: 'Livre introuvable' });
    res.json({ message: 'Livre supprimé' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;