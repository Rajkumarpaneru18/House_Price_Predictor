const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const mindsdbApiUrl = process.env.MINDSDB_API_URL;

// Use morgan middleware for logging requests
app.use(morgan("dev"));

// Use cors middleware to allow requests from all origins
app.use(cors());

app.use(express.json());

// POST endpoint for predicting house prices
app.post("/predict", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      City,
      Bedroom,
      Bathroom,
      Floors,
      Parking,
      Face,
      Year,
      Views,
      RoadWidth,
      RoadType,
    } = req.body;

    const response = await axios.post(mindsdbApiUrl, {
      data: [
        {
          City,
          Bedroom,
          Bathroom,
          Floors,
          Parking,
          Face,
          Year,
          Views,
          RoadWidth,
          RoadType,
        },
      ],
    });

    console.log("Response from MindsDB:", response.data);

    if (response.data && response.data.data && response.data.data.length > 0) {
      const predictedPrice = response.data.data[0].Price;
      res.json({ Price: predictedPrice });
    } else {
      throw new Error("Empty or unexpected response format");
    }
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Data:", error.request);
      res.status(500).json({ error: "No response from MindsDB server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
