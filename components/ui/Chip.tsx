import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Pill-shaped chip for category filters, toggles, and selection */
export default function Chip({ children, active = false, onClick, className = '' }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
        whitespace-nowrap transition-all duration-200 min-h-[44px]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-section-primary
        ${active
          ? 'bg-section-accent text-white shadow-md scale-[1.02]'
          : 'bg-white text-brand-text-dark border border-gray-200 hover:border-section-accent hover:text-section-primary'
        }
        ${className}
      `}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
