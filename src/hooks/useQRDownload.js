import { useState, useCallback } from 'react';
import { downloadQRCode } from '../utils/qr-utils';
import { APP_CONFIG } from '../constants';

export const useQRDownload = (svgRef, defaultFileName = APP_CONFIG.defaultFileName, size = APP_CONFIG.qrCodeSize) => {
  const [fileName, setFileName] = useState(defaultFileName);

  const downloadQR = useCallback(async () => {
    if (!svgRef.current) {
      console.error('SVG reference is not available');
      return;
    }

    try {
      await downloadQRCode(svgRef.current, fileName, size);
    } catch (error) {
      console.error('Failed to download QR code:', error);
      alert('Failed to download QR code. Please try again.');
    }
  }, [svgRef, fileName, size]);

  return {
    downloadQR,
    fileName,
    setFileName
  };
};