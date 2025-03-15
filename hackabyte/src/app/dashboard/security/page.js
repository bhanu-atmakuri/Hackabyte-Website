'use client';

import PasswordChangeForm from '@/components/shared/PasswordChangeForm';

export default function SecurityPage() {
  return (
    <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 p-6">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Change Password</h2>
        <p className="text-gray-300 mb-6">
          Update your password by entering your current password and choosing a new strong password.
        </p>
        <PasswordChangeForm />
      </div>
    </div>
  );
}
