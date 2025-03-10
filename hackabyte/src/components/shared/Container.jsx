// hackabyte/src/components/shared/Container.jsx
'use client';

/**
 * Responsive container component that ensures consistent margins and width across screen sizes
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be wrapped by the container
 * @param {'default'|'narrow'|'wide'} props.size - Container width variant (default, narrow, wide)
 * @param {string} props.className - Additional CSS classes to apply
 * @returns {JSX.Element}
 */
export default function Container({ children, size = 'default', className = '' }) {
  // Choose container class based on size prop
  const containerClass = 
    size === 'narrow' ? 'max-w-4xl' : 
    size === 'wide' ? 'max-w-7xl' : 
    'max-w-6xl'; // default
  
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${containerClass} ${className}`}>
      {children}
    </div>
  );
}