import styles from './Container.module.scss';

/**
 * Render the Container component.
 *
 * @param {Props} props The props object.
 * @param {children: JSX.Element} props.children The children components.
 *
 * @returns {React.ReactElement} The Container components.
 */

export default function Container({ children }) {
  return <div className={styles.component}>{children}</div>;
}
