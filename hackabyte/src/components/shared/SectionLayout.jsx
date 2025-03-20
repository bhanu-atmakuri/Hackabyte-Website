/**
 * Section Layout Component
 * 
 * A wrapper component that provides consistent section styling with:
 * - Responsive padding at different screen sizes
 * - Consistent container width through the Container component
 * - Customizable background colors
 * - Optional ID for anchor links
 * - Support for different container widths (default, narrow, wide)
 * - Standardized structure across the site for uniform appearance
 */

'use client';

import Container from './Container';

/**
 * Consistent layout component for sections with responsive padding
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content within the section
 * @param {string} props.className - Additional CSS classes for the section
 * @param {string} props.id - Optional ID for the section
 * @param {string} props.bgColor - Background color class
 * @param {'default'|'narrow'|'wide'} props.containerSize - Size of the container
 * @returns {JSX.Element}
 */
export default function SectionLayout({ 
  children, 
  className = '', 
  id, 
  bgColor = 'bg-[#1A1A1E]',
  containerSize = 'default'
}) {
  return (
    <section 
      id={id} 
      className={`relative py-10 sm:py-14 md:py-16 lg:py-20 2xl:py-24 ${bgColor} ${className}`}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
