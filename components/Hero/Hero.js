import React from 'react';
import className from 'classnames/bind';
import { Heading } from '../../components';
import styles from './Hero.module.scss';

/**
 * Render the Hero component.
 *
 * @param {Props} props The props object.
 * @param {string} props.title The title value.
 * @param {string} props.level The level value.
 * @param {children: JSX.Element} props.children The children components.
 * @param {string} props.className The css className value.
 *
 * @returns {React.ReactElement} The Hero component.
 */

let cx = className.bind(styles);

export default function Hero({ title, level = 'h2', children, className }) {
  return (
    <div className={cx(['component', className])}>
      <Heading level={level}>
        <span className={cx('title')}>{title}</span>
      </Heading>
      {children}
    </div>
  );
}
