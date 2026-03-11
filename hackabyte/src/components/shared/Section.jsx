'use client';

import Container from './Container';

export default function Section({
  children,
  containerSize = 'default',
  className = '',
  id = '',
  noPadding = false
}) {
  return (
    <section
      id={id || undefined}
      className={`relative ${noPadding ? '' : 'py-24 md:py-32 lg:py-40'} ${className}`}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
