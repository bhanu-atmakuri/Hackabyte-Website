'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

      {!isExpanded && shouldShowButton && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none"></div>
      )}

      {shouldShowButton && (
        <div className="mt-1 text-center">
          <motion.button
            onClick={toggleExpand}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/[0.03] hover:bg-white/[0.06] text-gray-400 hover:text-white border border-white/[0.06] hover:border-white/[0.12] transition-all flex items-center mx-auto ${buttonClassName}`}
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
