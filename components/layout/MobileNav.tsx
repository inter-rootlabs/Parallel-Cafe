'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  color: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus and prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when drawer opens
      const closeBtn = drawerRef.current?.querySelector<HTMLButtonElement>('[data-close-btn]');
      closeBtn?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-[70] h-full w-[min(85vw,360px)] bg-[#2f3e36] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            data-close-btn
            onClick={onClose}
            className="p-2 text-[#FAF7F2]/90 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-6 py-4" aria-label="Mobile navigation">
          <ul className="space-y-2">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-4 text-[#FAF7F2] text-lg font-medium rounded-2xl transition-colors duration-200 hover:bg-white/10 min-h-[44px]"
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: link.color }}
                    aria-hidden="true"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <p className="text-[#FAF7F2]/60 text-sm">
            Coffee · Food · Play · Screen
          </p>
          <p className="text-[#FAF7F2]/40 text-xs mt-1">
            Jayanagar, Bengaluru
          </p>
        </div>
      </div>
    </>
  );
}
