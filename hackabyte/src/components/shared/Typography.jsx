/**
 * Typography Component
 * 
 * A collection of responsive text components with consistent styling across the application.
 * Includes headings of different levels and paragraph text that automatically adjust
 * to different screen sizes using Tailwind's responsive classes.
 */

'use client';

/**
 * Heading1 Component - Top level heading (h1)
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be displayed
 * @param {string} props.className - Additional CSS classes to apply
 * @returns {JSX.Element} - Renders an h1 element with responsive text sizing
 */
export function Heading1({ children, className = '' }) {
  return (
    <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${className}`}>
      {children}
    </h1>
  );
}

/**
 * Heading2 Component - Secondary heading (h2)
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be displayed
 * @param {string} props.className - Additional CSS classes to apply
 * @returns {JSX.Element} - Renders an h2 element with responsive text sizing
 */
export function Heading2({ children, className = '' }) {
  return (
    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${className}`}>
      {children}
    </h2>
  );
}

/**
 * Heading3 Component - Tertiary heading (h3)
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be displayed
 * @param {string} props.className - Additional CSS classes to apply
 * @returns {JSX.Element} - Renders an h3 element with responsive text sizing
 */
export function Heading3({ children, className = '' }) {
  return (
    <h3 className={`text-xl sm:text-2xl md:text-3xl font-semibold ${className}`}>
      {children}
    </h3>
  );
}

/**
 * Paragraph Component - Standard paragraph text
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be displayed
 * @param {string} props.className - Additional CSS classes to apply
 * @returns {JSX.Element} - Renders a p element with responsive text sizing
 */
export function Paragraph({ children, className = '' }) {
  return (
    <p className={`text-base md:text-lg 2xl:text-xl ${className}`}>
      {children}
    </p>
  );
}
