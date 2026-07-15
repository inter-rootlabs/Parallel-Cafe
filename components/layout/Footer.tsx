'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MapPin, Clock, ChevronDown, Leaf } from 'lucide-react';
import Container from '../ui/Container';

const footerSections = [
  {
    title: 'Explore',
    links: [
      { href: '/', label: 'Home' },
      { href: '/cafe', label: 'Cafe & Menu' },
      { href: '/private-screening', label: 'Private Screening' },
      { href: '/gaming', label: 'Gaming Zone' },
      { href: '/offers', label: 'Offers & Deals' },
    ],
  },
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Parallel Cafe, Ground Floor, 2006/A, 26th Main, South End Main Road, Jayanagar 9th Block, Bengaluru, Karnataka 560041'
)}`;

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const toggleAccordion = (section: string) => {
    setOpenAccordion(prev => (prev === section ? null : section));
  };

  return (
    <footer className="bg-[#2f3e36] text-[#FAF7F2]">
      <Container className="py-12 sm:py-16">
        {/* Desktop: 4-column grid / Mobile: accordion sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.webp"
                alt="Parallel Cafe logo"
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <h3 className="font-heading text-xl font-semibold tracking-wide">PARALLEL CAFE</h3>
              </div>
            </div>
            <p className="text-[#FAF7F2]/70 text-sm leading-relaxed">
              One brand, three experiences — a café, private screening room, and gaming zone all under one roof in the heart of Jayanagar, Bengaluru.
            </p>
            <p className="text-[#FAF7F2]/50 text-xs italic">
              Coffee · Food · Play · Screen
            </p>
            <a
              href="https://instagram.com/parallel.cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FAF7F2]/80 hover:text-white transition-colors text-sm"
              aria-label="Follow us on Instagram at parallel.cafe"
            >
              <Instagram size={18} />
              @parallel.cafe
            </a>
          </div>

          {/* Column 2: Explore */}
          <div>
            {/* Mobile accordion */}
            <button
              className="md:hidden flex items-center justify-between w-full py-3 text-left"
              onClick={() => toggleAccordion('explore')}
              aria-expanded={openAccordion === 'explore'}
            >
              <h3 className="font-heading text-lg font-semibold">Explore</h3>
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${openAccordion === 'explore' ? 'rotate-180' : ''}`}
              />
            </button>
            <h3 className="hidden md:block font-heading text-lg font-semibold mb-4">Explore</h3>
            <ul
              className={`space-y-2 overflow-hidden transition-all duration-300 md:max-h-none ${
                openAccordion === 'explore' ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-none'
              }`}
            >
              {footerSections[0].links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#FAF7F2]/70 hover:text-white transition-colors text-sm block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit Us */}
          <div>
            <button
              className="md:hidden flex items-center justify-between w-full py-3 text-left"
              onClick={() => toggleAccordion('visit')}
              aria-expanded={openAccordion === 'visit'}
            >
              <h3 className="font-heading text-lg font-semibold">Visit Us</h3>
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${openAccordion === 'visit' ? 'rotate-180' : ''}`}
              />
            </button>
            <h3 className="hidden md:block font-heading text-lg font-semibold mb-4">Visit Us</h3>
            <div
              className={`space-y-3 overflow-hidden transition-all duration-300 md:max-h-none ${
                openAccordion === 'visit' ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-none'
              }`}
            >
              <div className="flex gap-2 text-[#FAF7F2]/70 text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Ground Floor, 2006/A, 26th Main, South End Main Road, Jayanagar 9th Block, Bengaluru, Karnataka 560041
                </p>
              </div>
              <p className="text-[#FAF7F2]/50 text-xs pl-6">
                Near Ragigudda Temple, Jayanagar
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#74bd58] hover:text-[#8cd970] transition-colors text-sm pl-6 font-medium"
              >
                <MapPin size={14} />
                Get Directions
              </a>
              <div className="flex items-center gap-2 text-[#FAF7F2]/70 text-sm pl-6">
                <Clock size={14} className="flex-shrink-0" />
                10:00 AM – 11:30 PM, all days
              </div>
            </div>
          </div>

          {/* Column 4: Get in Touch */}
          <div>
            <button
              className="md:hidden flex items-center justify-between w-full py-3 text-left"
              onClick={() => toggleAccordion('contact')}
              aria-expanded={openAccordion === 'contact'}
            >
              <h3 className="font-heading text-lg font-semibold">Get in Touch</h3>
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${openAccordion === 'contact' ? 'rotate-180' : ''}`}
              />
            </button>
            <h3 className="hidden md:block font-heading text-lg font-semibold mb-4">Get in Touch</h3>
            <div
              className={`space-y-3 overflow-hidden transition-all duration-300 md:max-h-none ${
                openAccordion === 'contact' ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-none'
              }`}
            >
              {/* PLACEHOLDER — replace with real contact info */}
              <p className="text-[#FAF7F2]/70 text-sm">
                📞 +91 XXXXX XXXXX
              </p>
              <p className="text-[#FAF7F2]/70 text-sm">
                ✉️ hello@parallelcafe.in
              </p>
              <a
                href="https://instagram.com/parallel.cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FAF7F2]/70 hover:text-white transition-colors text-sm"
              >
                <Instagram size={16} />
                @parallel.cafe
              </a>
              <p className="text-[#FAF7F2]/50 text-xs mt-2">
                Contact form coming soon
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#FAF7F2]/50 text-xs">
            © {currentYear} Parallel Cafe. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Leaf size={14} className="text-green-400" />
            <span className="text-[#FAF7F2]/50 text-xs">Pure Veg & Jain Friendly</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
