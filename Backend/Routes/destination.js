// backend/routes/destination.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define a route to fetch destination details
router.get('/:placeName', async (req, res) => {
    const placeName = req.params.placeName;
    const wikipediaAPI = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`;
    const geocodingAPI = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`;

    try {
        const [wikiResponse, geoResponse] = await Promise.all([
            axios.get(wikipediaAPI),
            axios.get(geocodingAPI)
        ]);

        if (wikiResponse.data) {
            const { title, extract, thumbnail } = wikiResponse.data;
            const address = geoResponse.data[0] ? geoResponse.data[0].display_name : 'Address not available';

            res.status(200).json({
                title,
                description: extract,
                image: thumbnail ? thumbnail.source : null,
                address
            });
        } else {
            res.status(404).json({ error: 'No data found for the requested place.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

module.exports = router;
