import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/** Content container capped at 1440px max-width, centered with responsive padding */
export default function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`max-w-site mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
