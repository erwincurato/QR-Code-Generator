import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ text = "Loading...", color = "#4645F6", size }) => {
  let containerClass = `${styles.loadingContainer} ${size ? styles[size] : ''}`.trim();

  return (
    <div className={containerClass}>
      <div className={styles.barLoader}>
        <div className={styles.bar} style={{ backgroundColor: color }}></div>
        <div className={styles.bar} style={{ backgroundColor: color }}></div>
        <div className={styles.bar} style={{ backgroundColor: color }}></div>
      </div>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  );
};

export default Loading;