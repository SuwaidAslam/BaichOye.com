import React from 'react'
import { Col } from 'react-bootstrap'
import styles from "./styles.module.css";

const Input = ({ label, placeholder, type, name, value=null, handleChange }) => {
  if (label === 'Description') {
    return (
      <Col xs={12}>
        <p className={styles.input_label}>
          {label}
        </p>
        <div className={styles.input_container}>
          <textarea
            rows="10"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleChange}
          />
        </div>
      </Col>
    )
  }

  return (
    <Col lg={12} xs={12}>
      <p
        className={styles.input_label}
      >
        {label}
      </p>
      <div className={styles.input_container}>
        <input
          type={type === 'number' ? 'number' : 'text'}
          placeholder={placeholder}
          name={name}
          value={value}
          id="auto-complete-input"
          onChange={handleChange}
        />
      </div>
    </Col>
  )
}

export default Input