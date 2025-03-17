'use client';

import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleSignOut}
      className="text-sm sm:text-base md:text-lg lg:text-xl btn-primary whitespace-nowrap"
    >
      Sign Out
    </motion.button>
  );
}
