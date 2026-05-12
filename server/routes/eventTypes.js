const express = require('express');
const router = express.Router();
const EventType = require('../models/EventType');

router.get('/', async (req, res) => {
  try {
    const eventTypes = await EventType.find();
    res.json(eventTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const eventType = new EventType({ name, description });
    await eventType.save();
    res.json(eventType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const eventType = await EventType.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    res.json(eventType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await EventType.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
