// components/Section.js
import React from 'react';
import styles from './Page.module.css';

const Section = ({ title, children }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default Section;