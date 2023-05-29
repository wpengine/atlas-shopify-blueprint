import React from 'react';

/**
 * Render the Heading component.
 *
 * @param {Props} props The props object.
 * @param {string} props.level The level value.
 * @param {children: JSX.Element} props.children The children components.
 * @param {string} props.className The css className value.
 *
 * @returns {React.ReactElement} The Heading component.
 */

export default function Heading({ level = 'h1', children, className }) {
  const Tag = ({ ...props }) => React.createElement(level, props, children);

  return <Tag className={className}>{children}</Tag>;
}
