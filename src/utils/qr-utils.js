/**
 * Utility functions for QR code operations
 */

import { APP_CONFIG, VALIDATION } from '../constants';

/**
 * Converts an SVG element to a downloadable PNG image
 * @param {SVGElement} svgElement - The SVG element to convert
 * @param {string} fileName - The name for the downloaded file
 * @param {number} size - The size of the QR code
 * @param {number} padding - The padding around the QR code
 * @returns {Promise<void>}
 */
export const downloadQRCode = (svgElement, fileName = APP_CONFIG.defaultFileName, size = APP_CONFIG.qrCodeSize, padding = APP_CONFIG.qrCodePadding) => {
  return new Promise((resolve, reject) => {
    if (!svgElement) {
      reject(new Error('SVG element is required'));
      return;
    }

    try {
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svgElement);

      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = size + padding * 2;
      canvas.height = size + padding * 2;
      const ctx = canvas.getContext("2d");

      // Fill background with white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const urlBlob = URL.createObjectURL(svgBlob);

      img.onload = () => {
        try {
          // Draw QR with padding
          ctx.drawImage(img, padding, padding, size, size);
          URL.revokeObjectURL(urlBlob);

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob from canvas'));
              return;
            }

            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${fileName || APP_CONFIG.defaultFileName}.png`;

            // Append to body for iOS Safari
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
            resolve();
          }, "image/png");
        } catch (drawError) {
          URL.revokeObjectURL(urlBlob);
          reject(drawError);
        }
      };

      img.onerror = (error) => {
        URL.revokeObjectURL(urlBlob);
        reject(new Error(`Failed to load image: ${error.message || 'Unknown error'}`));
      };

      img.src = urlBlob;
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Validates if a string is a valid URL
 * @param {string} string - The string to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Sanitizes a string to be used as a file name
 * @param {string} fileName - The file name to sanitize
 * @returns {string} - Sanitized file name
 */
export const sanitizeFileName = (fileName) => {
  if (!fileName) return APP_CONFIG.defaultFileName;

  // Remove invalid characters and trim
  return fileName
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid file name characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .substring(0, VALIDATION.maxFileNameLength) // Limit length
    .trim();
};