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

    if (response.data && response.data.length > 0) {
      let predictedPrice = response.data[0].Price.toString(); // Convert to string

      // Convert back to number to format with commas
      predictedPrice = Number(predictedPrice);

      // Check if predictedPrice is a valid number
      if (!isNaN(predictedPrice)) {
        // Format predictedPrice with commas every three digits
        predictedPrice = predictedPrice.toLocaleString("en");
      } else {
        predictedPrice = ""; // Handle case where predictedPrice is not a valid number
      }

      res.json({ Price: `Predicted price of house: NPR ${predictedPrice}` });
    } else {
      throw new Error("Empty or unexpected response format");
    }
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      // Handle specific error responses
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // Handle no response received
      console.error("Request Data:", error.request);
      res.status(500).json({ error: "No response from MindsDB server" });
    } else {
      // Handle other errors
      console.error("Error Message:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
