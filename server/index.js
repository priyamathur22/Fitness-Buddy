const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No image uploaded" });
  }

  const fileName = req.file.originalname.toLowerCase();

  const foodKeywords = [
    "pizza",
    "burger",
    "cake",
    "rice",
    "salad",
    "bread",
    "food"
  ];

  const isFood = foodKeywords.some(word =>
    fileName.includes(word)
  );

  if (!isFood) {
    return res.json({
      error: "Food not detected in the image"
    });
  }

  const calorieDB = {
    pizza: 266,
    burger: 295,
    cake: 340,
    rice: 200,
    salad: 150,
    bread: 265
  };

  let calories = 220;

  for (let key in calorieDB) {
    if (fileName.includes(key)) {
      calories = calorieDB[key];
      break;
    }
  }

  res.json({
    calories
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
