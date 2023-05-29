import React from 'react';
import styles from './Loader.module.scss';

/**
 * A component that mimics a loading state for better
 * perceived performance.
 *
 * @returns {React.ReactElement} The Loader component.
 */

const Loader = () => {
  return <div className={styles.loader} data-testid="loading"></div>;
};

export default Loader;
