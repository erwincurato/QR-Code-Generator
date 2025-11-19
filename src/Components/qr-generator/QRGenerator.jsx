import React, { useState } from "react";
import QRFrame from "./QRFrame";
import WifiLoader from "../ui/WifiLoader";
import { isValidUrl, normalizeUrl, isValidDomainOrPath } from "../../utils/qr-utils";
import { APP_CONFIG } from "../../constants";
import styles from "./QRGenerator.module.css";
import "../../styles/animations.css"; // Import reusable animations

const QRGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      setQrUrl("");
      return;
    }

    // Show loading state
    setIsLoading(true);
    setError("");

    // Simulate a small delay for better UX and to show the loading animation
    setTimeout(() => {
      if (isValidUrl(url)) {
        setError("");
        // Normalize the URL to ensure proper protocol
        setQrUrl(normalizeUrl(url));
      } else {
        setError("Please enter a valid URL");
        setQrUrl("");
      }
      // Hide loading state
      setIsLoading(false);
    }, 500); // Small delay to ensure loading spinner is visible
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
            disabled={isLoading}
          />
          {url && !isLoading && (
            <button
              type="button"
              className={`${styles.clearBtn} clear-btn-scale`}
              onClick={handleClear}
              aria-label="Clear input"
              disabled={isLoading}
            >
              ×
            </button>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <button
        onClick={handleGenerate}
        disabled={!url.trim() || isLoading}
        className="button-lift" // Apply reusable button animation
      >
        {isLoading ? "Generating..." : "Generate QR Code"}
      </button>

      {isLoading ? (
        <div className={styles.qrLoadingPlaceholder}>
          <WifiLoader
            text="Generating your QR code..."
            backColor="#E8F2FC"
            frontColor="#4645F6"
            desktopSize="120px"
            mobileSize="100px"
          />
        </div>
      ) : (
        <QRFrame url={qrUrl} />
      )}

      <div className={styles.instructions}>
        <p>Enter any URL to generate a QR code. Your data is processed locally - nothing is sent to our servers.</p>
      </div>
    </div>
  );
};

export default QRGenerator;