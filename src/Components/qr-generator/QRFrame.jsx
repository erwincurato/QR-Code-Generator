import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { useQRDownload } from "../../hooks/useQRDownload";
import { APP_CONFIG } from "../../constants";
import styles from "./QRFrame.module.css";
import "../../styles/animations.css"; // Import reusable animations

const QRFrame = ({ url }) => {
  const svgRef = useRef(null);
  const { downloadQR, fileName, setFileName } = useQRDownload(svgRef, APP_CONFIG.defaultFileName, APP_CONFIG.qrCodeSize);

  if (!url) {
    return (
      <div className={`${styles.qrFrame} lift-animation`}>
        <div className={styles.framePlaceholder}>
          <p>Your QR code will appear here after generation</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.qrFrame} ${styles.filled} lift-animation`}>
      <div className={styles.qrFrameContent}>
        <div className={`${styles.qrCode} qr-code-lift`}>
          <QRCode value={url} ref={svgRef} size={APP_CONFIG.qrCodeSize} />
        </div>

        <div className={styles.qrActions}>
          <div className={styles.fileNameInput}>
            <label>
              File Name:&nbsp;
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="File Name"
                maxLength={50}
                className="input-lift" // Apply reusable input animation
              />
            </label>
          </div>

          <button
            className={`${styles.downloadBtn} button-lift`}
            onClick={downloadQR}
            disabled={!url}
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRFrame;