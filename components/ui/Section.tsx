import React from 'react';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  fullBleed?: boolean;
}

/** Section wrapper with consistent vertical spacing and optional full-bleed background */
export default function Section({
  children,
  className = '',
  containerClassName = '',
  id,
  fullBleed = false,
}: SectionProps) {
  return (
    <section id={id} className={`py-12 sm:py-16 lg:py-20 ${className}`}>
      {fullBleed ? (
        children
      ) : (
        <Container className={containerClassName}>{children}</Container>
      )}
    </section>
  );
}
