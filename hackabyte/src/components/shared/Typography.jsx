'use client';

export function SectionLabel({ children, className = '' }) {
  return (
    <span className={`label-uppercase mb-4 block ${className}`}>
      {children}
    </span>
  );
}

export function Heading1({ children, className = '' }) {
  return (
    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight ${className}`}>
      {children}
    </h1>
  );
}

export function Heading2({ children, className = '' }) {
  return (
    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${className}`}>
      {children}
    </h2>
  );
}

export function Heading3({ children, className = '' }) {
  return (
    <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function Paragraph({ children, className = '' }) {
  return (
    <p className={`text-base md:text-lg 2xl:text-xl ${className}`}>
      {children}
    </p>
  );
}
