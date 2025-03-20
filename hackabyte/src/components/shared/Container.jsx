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
  // Determine base container class based on size
  let containerClass;
  
  switch(size) {
    case 'half':
      containerClass = 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8';
      break;
    case 'wide':
      containerClass = 'max-w-8xl mx-auto px-4 sm:px-6 lg:px-8';
      break;
    default: // default size
      containerClass = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
      break;
  }
  
  return (
    <div className={`${containerClass} ${className}`}>
      {children}
    </div>
  );
}
