import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { useQRDownload } from "../../hooks/useQRDownload";
import { APP_CONFIG } from "../../constants";
import styles from "./QRFrame.module.css";

const QRFrame = ({ url }) => {
  const svgRef = useRef(null);
  const { downloadQR, fileName, setFileName } = useQRDownload(svgRef, APP_CONFIG.defaultFileName, APP_CONFIG.qrCodeSize);

  if (!url) {
    return (
      <div className={styles.qrFrame}>
        <div className={styles.framePlaceholder}>
          <p>Your QR code will appear here after generation</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.qrFrame} ${styles.filled}`}>
      <div className={styles.qrFrameContent}>
        <div className={styles.qrCode}>
          <QRCode value={url} ref={svgRef} size={QR_FRAME_DEFAULT_SIZE} />
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
              />
            </label>
          </div>

          <button
            className={styles.downloadBtn}
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