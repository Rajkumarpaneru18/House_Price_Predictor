import React, { useState } from "react";
import axios from "axios";

const PropertiesForm = () => {
  const [City, setCity] = useState("");
  const [Bedroom, setBedroom] = useState("");
  const [Bathroom, setBathroom] = useState("");
  const [Floors, setFloors] = useState("");
  const [Parking, setParking] = useState("");
  const [Face, setFace] = useState("");
  const [Year, setYear] = useState("");
  const [Views, setViews] = useState("");
  const [RoadWidth, setRoadWidth] = useState("");
  const [RoadType, setRoadType] = useState("");

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/predict", {
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
      });

      console.log("Response from backend:", response.data);
      setPredictedPrice(response.data.price);
    } catch (err) {
      console.error("Failed to fetch the predicted price:", err);
      setPredictedPrice("Failed to fetch the predicted price.");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setCity("");
    setBedroom("");
    setBathroom("");
    setFloors("");
    setParking("");
    setFace("");
    setYear("");
    setViews("");
    setRoadWidth("");
    setRoadType("");
    setPredictedPrice(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-red-500">House Properties</h1>

      {predictedPrice === null ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-orange-600 font-semibold"
        >
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="city" className="block mb-1">
                City(No.)
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-3 py-2 border rounded"
                value={City}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="bedroom" className="block mb-1">
                Bedroom
              </label>
              <input
                type="string"
                id="bedroom"
                className="w-full px-3 py-2 border rounded"
                value={Bedroom}
                onChange={(e) => setBedroom(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="bathroom" className="block mb-1">
                Bathroom
              </label>
              <input
                type="string"
                id="bathroom"
                className="w-full px-3 py-2 border rounded"
                value={Bathroom}
                onChange={(e) => setBathroom(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="floors" className="block mb-1">
                Floors
              </label>
              <input
                type="string"
                id="floors"
                className="w-full px-3 py-2 border rounded"
                value={Floors}
                onChange={(e) => setFloors(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="parking" className="block mb-1">
                Parking
              </label>
              <input
                type="string"
                id="parking"
                className="w-full px-3 py-2 border rounded"
                value={Parking}
                onChange={(e) => setParking(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="face" className="block mb-1">
                Face (direction)
              </label>
              <input
                type="string"
                id="face"
                className="w-full px-3 py-2 border rounded"
                value={Face}
                onChange={(e) => setFace(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="year" className="block mb-1">
                Year(in B.S)
              </label>
              <input
                type="string"
                id="year"
                className="w-full px-3 py-2 border rounded"
                value={Year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="views" className="block mb-1">
                Views
              </label>
              <input
                type="string"
                id="views"
                className="w-full px-3 py-2 border rounded"
                value={Views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="roadWidth" className="block mb-1">
                Road Width (Feet)
              </label>
              <input
                type="string "
                id="roadWidth"
                className="w-full px-3 py-2 border rounded"
                value={RoadWidth}
                onChange={(e) => setRoadWidth(e.target.value)}
              />
            </div>
            <div className="w-1/2 px-2 mb-4">
              <label htmlFor="roadType" className="block mb-1">
                Road Type
              </label>
              <input
                type="string"
                id="roadType"
                className="w-full px-3 py-2 border rounded"
                value={RoadType}
                onChange={(e) => setRoadType(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </form>
      ) : (
        <div className="mt-8 items-center">
          <h2 className="text-xl font-semibold">
            {typeof predictedPrice === "string" ? (
              predictedPrice
            ) : (
              <>Predicted Price: NPR {predictedPrice}</>
            )}
          </h2>
          <button
            onClick={handleTryAgain}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 mt-4"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertiesForm;
