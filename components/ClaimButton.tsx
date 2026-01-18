'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';
import ClaimModal from './ClaimModal';

interface ClaimButtonProps {
  facilityName: string;
  facilitySlug: string;
  variant?: 'primary' | 'secondary' | 'sidebar';
}

export default function ClaimButton({ facilityName, facilitySlug, variant = 'primary' }: ClaimButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonStyles = {
    primary: 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-lg',
    secondary: 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20',
    sidebar: 'w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors',
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={buttonStyles[variant]}
      >
        <Shield className="w-5 h-5" />
        <span>Claim this listing</span>
      </button>

      <ClaimModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        facilityName={facilityName}
        facilitySlug={facilitySlug}
      />
    </>
  );
}
