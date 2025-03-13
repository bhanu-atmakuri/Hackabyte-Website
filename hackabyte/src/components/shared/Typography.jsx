// hackabyte/src/components/shared/Typography.jsx
'use client';

/**
 * Responsive heading components
 */

export function Heading1({ children, className = '' }) {
  return (
    <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${className}`}>
      {children}
    </h1>
  );
}

export function Heading2({ children, className = '' }) {
  return (
    <h2 className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold ${className}`}>
      {children}
    </h2>
  );
}

export function Heading3({ children, className = '' }) {
  return (
    <h3 className={`text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold ${className}`}>
      {children}
    </h3>
  );
}

export function Paragraph({ children, className = '' }) {
  return (
    <p className={`text-sm xs:text-base sm:text-base md:text-lg 2xl:text-xl ${className}`}>
      {children}
    </p>
  );
}

export function SmallText({ children, className = '' }) {
  return (
    <p className={`text-xs xs:text-sm sm:text-sm md:text-base ${className}`}>
      {children}
    </p>
  );
}
