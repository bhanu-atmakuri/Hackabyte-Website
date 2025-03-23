'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Expandable Content Component
 * 
 * A reusable component that shows a preview of content with a "Show More"/"Show Less" toggle
 * to expand and collapse the full content.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to display
 * @param {number} props.maxHeight - Maximum height in pixels before collapsing (default: 100)
 * @param {string} props.expandLabel - Label for the expand button (default: "Show More")
 * @param {string} props.collapseLabel - Label for the collapse button (default: "Show Less")
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.buttonClassName - Additional CSS classes for the button
 */
export default function ExpandableContent({
  children,
  maxHeight = 100,
  expandLabel = "Show More",
  collapseLabel = "Show Less",
  className = "",
  buttonClassName = ""
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef(null);

  // Check if content exceeds maxHeight to determine if we should show the toggle button
  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setShouldShowButton(contentHeight > maxHeight);
    }
  }, [children, maxHeight]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        ref={contentRef}
        animate={{ 
          height: isExpanded ? 'auto' : shouldShowButton ? maxHeight : 'auto',
          opacity: 1 
        }}
        initial={{ opacity: 0 }}
        style={{ overflow: 'hidden' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      
      {/* Gradient fade effect when collapsed */}
      {!isExpanded && shouldShowButton && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1A1A1E] via-[#1A1A1E]/80 to-transparent pointer-events-none"></div>
      )}
      
      {/* Button only appears if content exceeds maxHeight */}
      {shouldShowButton && (
        <div className="mt-1 text-center">
          <motion.button
            onClick={toggleExpand}
            className={`px-3 py-1 text-xs bg-[#1E1E22] hover:bg-[#2A2A32] text-white rounded-full transition-colors flex items-center mx-auto border border-gray-700 ${buttonClassName}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{isExpanded ? collapseLabel : expandLabel}</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3.5 w-3.5 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </div>
      )}
    </div>
  );
}
