import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return <div className={styles.loader} data-testid="loading"></div>;
};

export default Loader;
