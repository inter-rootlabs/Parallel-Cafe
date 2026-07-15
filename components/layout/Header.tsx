'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart/cart-context';
import MobileNav from './MobileNav';

const navLinks = [
  { href: '/', label: 'Home', color: '#2f3e36' },
  { href: '/cafe', label: 'Cafe', color: '#74bd58' },
  { href: '/private-screening', label: 'Private Screening', color: '#b76e79' },
  { href: '/gaming', label: 'Gaming', color: '#00aab7' },
  { href: '/offers', label: 'Offers', color: '#f59e0b' },
];

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#2f3e36] shadow-lg">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Parallel Cafe — Coffee, Food, Play, Screen"
                width={44}
                height={44}
                className="rounded-full"
                priority
              />
              <div className="hidden sm:block">
                <span className="text-white font-heading text-lg font-semibold tracking-wide">
                  PARALLEL
                </span>
                <span className="text-[#FAF7F2]/70 font-heading text-sm ml-1.5 tracking-wider">
                  CAFE
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-[#FAF7F2]/90 hover:text-white text-sm font-medium rounded-full transition-colors duration-200 hover:bg-white/10"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: link.color }}
                    aria-hidden="true"
                  />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart button */}
              <button
                onClick={openCart}
                className="relative p-2 text-[#FAF7F2]/90 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Shopping bag, ${itemCount} items`}
              >
                <ShoppingBag size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#74bd58] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden p-2 text-[#FAF7F2]/90 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={navLinks}
      />
    </>
  );
}
