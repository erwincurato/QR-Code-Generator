import React, { useState } from "react";
import QRFrame from "./QRFrame";
import { isValidUrl } from "../../utils/qr-utils";
import { APP_CONFIG } from "../../constants";
import styles from "./QRGenerator.module.css";

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
      setQrUrl(url);
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
    <div className={styles.container}>
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
          />
          {url && (
            <button 
              type="button" 
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear input"
            >
              ×
            </button>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <button onClick={handleGenerate} disabled={!url.trim()}>
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