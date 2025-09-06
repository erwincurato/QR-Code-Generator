export function DownloadQr(svgRef, fileName = "EC_QR", size = 210) {
  if (!svgRef.current) return;

  const svg = svgRef.current;
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const img = new window.Image();
  const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const urlBlob = URL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size);
    URL.revokeObjectURL(urlBlob);

    canvas.toBlob((blob) => {
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${fileName || "EC_QR"}.png`;

      // Append to body for iOS Safari
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    }, "image/png");
  };

  img.src = urlBlob;
}
