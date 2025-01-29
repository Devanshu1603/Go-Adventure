const express = require("express");
const axios = require("axios");

const router = express.Router();
const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";

// API endpoint to handle search requests
router.post("/search", async (req, res) => {
  const { location } = req.body;

  try {
    const response = await axios.get(WIKIPEDIA_API_URL, {
      params: {
        action: "query",
        list: "search",
        srsearch: `tourist attractions in ${location}`,
        srlimit: 20,
        format: "json",
      },
    });

    const placesWithDetails = await Promise.all(
      response.data.query.search.map(async (place) => {
        const pageDetailsResponse = await axios.get(WIKIPEDIA_API_URL, {
          params: {
            action: "query",
            prop: "extracts|pageimages",
            exintro: true,
            exchars: 500,
            titles: place.title,
            pithumbsize: 300,
            format: "json",
          },
        });

        const pages = pageDetailsResponse.data.query.pages;
        const page = pages[Object.keys(pages)[0]];
        const openingHours = "9:00 AM - 6:00 PM";
        const closingHours = "Closed on Mondays";
        const imageUrl = page.thumbnail ? page.thumbnail.source : null;

        return {
          title: place.title,
          description: page.extract,
          imageUrl,
          url: `https://en.wikipedia.org/?curid=${place.pageid}`,
          openingHours,
          closingHours,
        };
      })
    );

    res.json(placesWithDetails);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

module.exports = router;
