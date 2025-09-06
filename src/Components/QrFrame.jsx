import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { DownloadQr } from "../Utility/DownloadQR";

function QrFrame({ url }) {
  const svgRef = useRef(null);
  const [fileName, setFileName] = useState("EC_QR");
  const size = 210; // Standard QR code size

  return (
    <div className={`qr-frame ${url ? "filled" : "empty"}`}>
      {!url ? (
        <div className="frame-placeholder">
          <p>Your QR code will appear here after generation</p>
        </div>
      ) : (
        <div className="qr-frame-content">
          <div className="qr-code">
            <QRCode value={url} ref={svgRef} size={size} />
          </div>

          <div className="qr-actions">
            <div className="Filename">
              <label>
                File Name:&nbsp;
                <input
                  type="text"
                  value={fileName}
                  onChange={e => setFileName(e.target.value)}
                  style={{ width: "140px" }}
                  placeholder="File Name"
                />
              </label>
            </div>

            <button
              className="download-btn"
              onClick={() => DownloadQr(svgRef, fileName, size)}
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QrFrame;
