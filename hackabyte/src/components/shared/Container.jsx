'use client';

/**
 * Responsive container component that ensures consistent margins across screen sizes
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be wrapped by the container
 * @param {'default'|'half'|'wide'} props.size - Container width variant (default, half, wide)
 * @param {string} props.className - Additional CSS classes to apply
 * @returns {JSX.Element}
 */
export default function Container({ children, size = 'default', className = '' }) {
  // Determine base container class
  const containerClass = 
    size === 'half' ? 'container-half' :
    size === 'wide' ? 'container-wide' :
    'container-normal';
  
  return (
    <div className={`${containerClass} ${className}`}>
      {children}
    </div>
  );
}
