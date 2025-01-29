const express = require('express');
const router = express.Router();
const SubscriberModel = require('../Models/Subscriber');

// POST route to add a new subscriber
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if the email is already subscribed
        const existingSubscriber = await SubscriberModel.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ error: 'Email is already subscribed' });
        }

        // Save the new subscriber
        const newSubscriber = new SubscriberModel({ email });
        await newSubscriber.save();

        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('Error in subscription:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
