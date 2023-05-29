import classNames from 'classnames/bind';
import * as SELECTORS from '../../constants/selectors';
import styles from './Main.module.scss';

/**
 * Render the Main component.
 *
 * @param {Props} props The props object.
 * @param {children: JSX.Element} props.children The children components.
 * @param {string} props.className The css className value.
 * @param {...Array<string>} props.props The array of strings inputs.
 *
 * @returns {React.ReactElement} The Main component.
 */

let cx = classNames.bind(styles);

export default function Main({ children, className, ...props }) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={cx(['component', className])}
      {...props}
    >
      {children}
    </main>
  );
}
