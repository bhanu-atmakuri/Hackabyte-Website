'use client';

import Container from './Container';

/**
 * Responsive section component with consistent padding and container width
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be wrapped by the section
 * @param {'default'|'narrow'|'wide'} props.containerSize - Container width variant
 * @param {string} props.className - Additional CSS classes to apply to the section
 * @param {string} props.id - Optional ID for the section
 * @param {boolean} props.noPadding - If true, disables the default section padding
 * @returns {JSX.Element}
 */
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
      className={`relative ${noPadding ? '' : 'py-16 md:py-20 lg:py-24'} ${className}`}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}