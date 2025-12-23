import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setResult("");

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const scanFood = async () => {
    if (!file) {
      setResult("Please upload a food image first");
      return;
    }

    setResult("Analyzing...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.error) {
        setResult(data.error);
      } else {
        setResult(`Estimated Calories: ${data.calories} kcal`);
      }
    } catch {
      setResult("Server error. Try again.");
    }
  };

  return (
    <div className="page">
      <h1 className="title">Fitness Buddy</h1>

      <div className="upload-box">
        {!preview && (
          <label className="upload-label">
            Upload your food here
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </label>
        )}

        {preview && (
          <img
            src={preview}
            alt="Food preview"
            className="preview"
          />
        )}
      </div>

      <button className="scan-btn" onClick={scanFood}>
        Scan Food
      </button>

      <p className="result">{result}</p>
    </div>
  );
}

export default App;
