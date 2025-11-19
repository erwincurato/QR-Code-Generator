import React, { useState } from "react";
import QRFrame from "./QRFrame";
import { isValidUrl, normalizeUrl, isValidDomainOrPath } from "../../utils/qr-utils";
import { APP_CONFIG } from "../../constants";
import styles from "./QRGenerator.module.css";
import "../../styles/animations.css"; // Import reusable animations

const QRGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      setQrUrl("");
      return;
    }

    if (isValidUrl(url)) {
      setError("");
      // Normalize the URL to ensure proper protocol
      setQrUrl(normalizeUrl(url));
    } else {
      setError("Please enter a valid URL");
      setQrUrl("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  const handleClear = () => {
    setUrl("");
    setQrUrl("");
    setError("");
  };

  return (
    <div className={`${styles.container} card-lift`}>
      <h1>{APP_CONFIG.appName}</h1>

      <div className={styles.inputGroup}>
        <label htmlFor="url-input">Enter your URL</label>
        <div className={styles.inputContainer}>
          <input
            type="url"
            id="url-input"
            placeholder={APP_CONFIG.defaultUrlPlaceholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-lift" // Apply reusable input animation
          />
          {url && (
            <button
              type="button"
              className={`${styles.clearBtn} clear-btn-scale`}
              onClick={handleClear}
              aria-label="Clear input"
            >
              ×
            </button>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <button
        onClick={handleGenerate}
        disabled={!url.trim()}
        className="button-lift" // Apply reusable button animation
      >
        Generate QR Code
      </button>

      <QRFrame url={qrUrl} />

      <div className={styles.instructions}>
        <p>Enter any URL to generate a QR code. Your data is processed locally - nothing is sent to our servers.</p>
      </div>
    </div>
  );
};

export default QRGenerator;