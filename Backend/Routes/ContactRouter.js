const express = require('express');
const Contact = require('../Models/Contact');

const router = express.Router();

// POST route to handle form submissions
router.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact saved successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact details' });
  }
});

module.exports = router;
