import React from 'react';

const Tag = ({ level, children, ...props }) => React.createElement(level, props, children);

export default function Heading({ level = 'h1', children, className }) {
  return <Tag level={level} className={className}>{children}</Tag>;
}
