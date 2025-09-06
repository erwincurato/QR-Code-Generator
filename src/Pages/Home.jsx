import React, { useState } from "react";
import QrFrame from "../Components/QrFrame";
import "../styles/Home.css";
import "../Styles/QrFrame.css";

//My QR Code Generator page
function Home() {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    try {
      new URL(url); // validate URL
      setError("");
      setQrUrl(url); // Only set QR code URL if valid
    } catch {
      setError("Please enter a valid URL");
      setQrUrl(""); // Clear QR code if invalid
    }
  };

  return (
    <div className="container">
      <h1>EC-QR Generator</h1>

      <div className="input-group">
        <label htmlFor="url-input">Enter your URL</label>
        <input
          type="url"
          id="url-input"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
      </div>

      <button onClick={handleGenerate}>Generate QR Code</button>

      <QrFrame url={qrUrl} />

      <div className="instructions">
        <p>Enter any URL to generate a QR code. Your data is processed locally - nothing is sent to our servers.</p>
      </div>
    </div>
  );
}

export default Home;