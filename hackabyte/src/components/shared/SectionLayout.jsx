'use client';

import Container from './Container';

export default function SectionLayout({
  children,
  className = '',
  id,
  bgColor = 'bg-surface-200',
  containerSize = 'default'
}) {
  return (
    <section
      id={id}
      className={`relative py-16 sm:py-20 md:py-24 lg:py-32 2xl:py-36 ${bgColor} ${className}`}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
