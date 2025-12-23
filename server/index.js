const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("image"), (req, res) => {
  const calories = Math.floor(Math.random() * 300) + 100;
  res.json({ calories });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
