import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const scanFood = async () => {
    if (!file) {
      setResult("Please upload an image first");
      return;
    }

    setResult("Analyzing image...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setResult(`Estimated Calories: ${data.calories} kcal`);
    } catch (err) {
      setResult("Error connecting to server");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>AI Fitness Buddy</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={scanFood}>Scan Food</button>

        <p className="result">{result}</p>
      </div>
    </div>
  );
}

export default App;
