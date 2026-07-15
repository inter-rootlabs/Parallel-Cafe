import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteSettings, getOffers } from '@/lib/sanity/queries';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { ArrowRight, Leaf, Clock, MapPin, Instagram } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export const revalidate = 60; // ISR

export default async function HomePage() {
  const settings = await getSiteSettings();
  const offersData = await getOffers();

  // Pick top 2 flat offers for teaser
  const topOffers = offersData.flatOffers?.slice(0, 2) || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#2f3e36] text-[#FAF7F2] overflow-hidden py-24">
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 hero-gradient opacity-80" />

        {/* Animated steam motif (handled via CSS animation in globals.css) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-steam pointer-events-none" />

        <Container className="relative z-10 text-center flex flex-col items-center max-w-4xl">
          <Image
            src={settings.logo || '/images/logo.webp'}
            alt="Parallel Cafe"
            width={120}
            height={120}
            className="rounded-full mb-8 shadow-2xl animate-card-enter"
            priority
          />
          <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 neon-glow drop-shadow-xl animate-card-enter stagger-1">
            {settings.homeHeroTitle}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-body max-w-2xl mx-auto leading-relaxed animate-card-enter stagger-2">
            {settings.homeHeroSubtitle}
          </p>
        </Container>
      </section>

      {/* Trust Strip */}
      <div className="bg-[#FAF7F2] border-b border-[#2f3e36]/10">
        <Container className="py-6 sm:py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[#1A1F1C]/80 text-sm sm:text-base font-medium">
            <div className="flex items-center gap-2">
              <Leaf className="text-[#74bd58]" size={18} />
              100% Pure Veg
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#2f3e36]/20" />
            <div className="flex items-center gap-2">
              <span className="veg-indicator" />
              Jain-Friendly
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#2f3e36]/20" />
            <div className="flex items-center gap-2">
              <Clock className="text-[#00aab7]" size={18} />
              Open 10 AM – 11:30 PM
            </div>
            <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#2f3e36]/20" />
            <div className="flex items-center gap-2">
              <MapPin className="text-[#b76e79]" size={18} />
              Jayanagar, Bengaluru
            </div>
          </div>
        </Container>
      </div>

      {/* Experience Tiles */}
      <Section className="bg-white">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="mb-4">Three Experiences, One Brand</h2>
          <p className="text-[#1A1F1C]/70 max-w-xl mx-auto">
            Whether you&apos;re here for a handcrafted coffee, a private movie night, or an intense gaming session, we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Cafe Tile */}
          <Link href="/cafe" className="group block h-full">
            <div className="h-full flex flex-col glass-card border-none bg-[#d3fbd8] overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl rounded-2xl relative">
              <div className="h-48 sm:h-56 relative bg-[#2f3e36] flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                <h3 className="text-white text-3xl sm:text-4xl relative z-10 tracking-wide drop-shadow-md">CAFÉ</h3>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <p className="text-[#1A1F1C] text-lg mb-6 flex-1 font-medium">
                  Fresh, made-with-love pure veg food and handcrafted coffees.
                </p>
                <div className="flex items-center gap-2 text-[#2f3e36] font-semibold group-hover:text-[#74bd58] transition-colors">
                  Explore Menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Screening Tile */}
          <Link href="/private-screening" className="group block h-full">
            <div className="h-full flex flex-col glass-card border-none bg-[#ebdfe4] overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl rounded-2xl relative">
              <div className="h-48 sm:h-56 relative bg-[#b76e79] flex items-center justify-center p-8 overflow-hidden" >
                <div className="absolute inset-0 bg-[url('/assets/images/roomtheatre.png')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url(/assets/images/roomtheatre.png)' }} />
                <h3 className="text-white text-3xl sm:text-4xl relative z-10 tracking-wide drop-shadow-md font-screening italic">PRIVATE SCREENING</h3>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <p className="text-[#1A1F1C] text-lg mb-6 flex-1 font-medium">
                  Intimate screening rooms for movie nights and celebrations.
                </p>
                <div className="flex items-center gap-2 text-[#9c6880] font-semibold group-hover:text-[#b76e79] transition-colors">
                  Book a Room <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Gaming Tile */}
          <Link href="/gaming" className="group block h-full">
            <div className="h-full flex flex-col glass-card border-none bg-[#e1ffff] overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl rounded-2xl relative">
              <div className="h-48 sm:h-56 relative bg-[#1A1F1C] flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                <h3 className="text-[#7df9ff] text-3xl sm:text-4xl relative z-10 tracking-wide font-gaming uppercase neon-glow drop-shadow-md">GAMING ZONE</h3>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <p className="text-[#1A1F1C] text-lg mb-6 flex-1 font-medium">
                  PS5 gaming zone with tournaments and hourly bookings.
                </p>
                <div className="flex items-center gap-2 text-[#00aab7] font-semibold group-hover:text-[#008b96] transition-colors">
                  Level Up <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Section>

      {/* Offers Teaser */}
      {topOffers.length > 0 && (
        <Section className="bg-[#FAF7F2]">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#2f3e36]/10 text-center">
            <h2 className="mb-8">Current Offers</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
              {topOffers.map(offer => (
                <div key={offer.id || offer.title} className="flex-1 w-full p-6 bg-[#d3fbd8]/30 rounded-2xl border border-[#74bd58]/20">
                  <Badge variant="outline" className="mb-3 border-[#74bd58] text-[#2f3e36]">Flat Offer</Badge>
                  <h3 className="text-xl sm:text-2xl text-[#2f3e36] mb-2">{offer.title}</h3>
                  {offer.condition && <p className="text-sm text-[#1A1F1C]/60">{offer.condition}</p>}
                </div>
              ))}
            </div>
            <Link
              href="/offers"
              className="inline-flex items-center justify-center gap-2 bg-[#2f3e36] text-[#FAF7F2] px-8 py-3.5 rounded-full font-medium hover:bg-[#1A1F1C] transition-colors shadow-md hover:shadow-lg"
            >
              View All Offers
            </Link>
          </div>
        </Section>
      )}

      {/* Instagram CTA */}
      <Section className="bg-white border-t border-[#2f3e36]/5">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white mb-6 shadow-lg">
            <Instagram size={32} />
          </div>
          <h2 className="mb-4">Follow Our Journey</h2>
          <p className="text-[#1A1F1C]/70 mb-8 max-w-lg mx-auto">
            Stay updated with our latest menu additions, tournament announcements, and cafe moments.
          </p>
          <a
            href="https://instagram.com/parallel.cafe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-semibold text-[#bc1888] hover:text-[#e6683c] transition-colors"
          >
            @parallel.cafe
          </a>
        </div>
      </Section>
    </>
  );
}
