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
 * Validates if a string is a valid URL with comprehensive checks
 * @param {string} string - The string to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
export const isValidUrl = (string) => {
  if (!string || typeof string !== 'string') {
    return false;
  }

  // Check if string is too short to be a valid URL
  if (string.length < 4) {
    return false;
  }

  // Check for forbidden patterns that are clearly invalid
  if (string.includes(' ')) {
    // Allow spaces only if it's a data URL or similar special case
    if (!string.startsWith('data:')) {
      return false;
    }
  }

  try {
    // Check for common URL schemes
    let fullUrl = string;

    // If no protocol is provided, try adding 'https://' and test
    if (!string.includes('://')) {
      // Make sure it looks like a valid domain before adding protocol
      if (string.startsWith('www.')) {
        fullUrl = `https://${string}`;
      } else if (isValidDomain(string)) {
        fullUrl = `https://${string}`;
      } else {
        // If it doesn't look like a valid domain, it's likely invalid
        return false;
      }
    }

    new URL(fullUrl);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Validates if a string looks like a valid domain
 * @param {string} domain - The domain string to validate
 * @returns {boolean} - True if valid domain structure, false otherwise
 */
export const isValidDomain = (domain) => {
  if (!domain || typeof domain !== 'string') {
    return false;
  }

  // Basic domain validation using regex
  // This checks for valid domain structure
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/;

  // Additional check: ensure it has at least one dot that's not at the beginning or end
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
    return false;
  }

  // Check for valid characters and structure
  return domainRegex.test(domain);
};

/**
 * Normalizes a URL to ensure it has the proper protocol
 * @param {string} string - The URL string to normalize
 * @returns {string} - The normalized URL
 */
export const normalizeUrl = (string) => {
  if (!string) return '';

  // If the string doesn't have a protocol, add https://
  if (!string.startsWith('http://') && !string.startsWith('https://')) {
    // Check if it starts with www or looks like a domain
    const trimmedString = string.trim();

    if (trimmedString.startsWith('www.')) {
      return `https://${trimmedString}`;
    } else if (isValidDomain(trimmedString)) {
      return `https://${trimmedString}`;
    }
  }
  return string;
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