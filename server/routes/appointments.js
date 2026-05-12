const express = require('express');

module.exports = (Appointment) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      const data = { ...req.body, status: 'upcoming' };
      const appointment = new Appointment(data);
      await appointment.save();
      res.status(201).json(appointment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.json(appointments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/user/:email', async (req, res) => {
    try {
      const appointments = await Appointment.find({ clientEmail: req.params.email });
      res.json(appointments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

    router.patch('/:id/status', async (req, res) => {
      try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        res.json(appointment);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

      router.delete('/:id', async (req, res) => {
        try {
          const deleted = await Appointment.findByIdAndDelete(req.params.id);
          if (!deleted) return res.status(404).json({ error: 'Appointment not found' });
          res.json({ success: true });
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });

  return router;
};
