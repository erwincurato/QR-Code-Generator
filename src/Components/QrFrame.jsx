
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";

function QrFrame({ url }) {
  const svgRef = useRef(null);
  const [fileName, setFileName] = useState("EC_QR");
  const size = 210; // Standard fixed size

  // Download QR code as PNG
  const handleDownload = () => {
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    // Create canvass
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Create image from SVG
    const img = new window.Image();
    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const urlBlob = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(urlBlob);

      // Download as PNG
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${fileName || "EC_QR"}.png`;
      link.click();
    };
    img.src = urlBlob;
  };

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
        <button className="download-btn" onClick={handleDownload}>
          Download QR Code
        </button>
      </div>
    </div>
  )}
</div>
  );
}

export default QrFrame;