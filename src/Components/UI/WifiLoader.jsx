import React from 'react';
import styles from './WifiLoader.module.css';

const WifiLoader = ({
  background = "transparent",
  desktopSize = "150px",
  mobileSize = "150px",
  text = "Loading...",
  backColor = "#E8F2FC",
  frontColor = "#4645F6",
  className = ""
}) => {
  return (
    <div
      className={`${styles.wifiLoaderContainer} ${className}`}
      style={{ backgroundColor: background }}
    >
      <div className={styles.wifiLoader}>
        <div
          className={styles.wifiSignal}
          style={{
            width: desktopSize,
            height: desktopSize,
            '--wifi-back-color': backColor,
            '--wifi-front-color': frontColor
          }}
        >
          <div className={styles.wifiIcon}>
            <div className={styles.wifiRing1}></div>
            <div className={styles.wifiRing2}></div>
            <div className={styles.wifiRing3}></div>
            <div className={styles.wifiRing4}></div>
            <div className={styles.wifiRing5}></div>
            <div className={styles.wifiRing6}></div>
            <div className={styles.wifiDot}></div>
          </div>
        </div>
        {text && <p className={styles.loaderText}>{text}</p>}
      </div>
    </div>
  );
};

export default WifiLoader;