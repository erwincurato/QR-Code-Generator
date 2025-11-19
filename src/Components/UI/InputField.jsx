import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ 
  id, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  onKeyDown,
  error,
  ...props 
}) => {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={error ? styles.errorInput : ''}
        {...props}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputField;