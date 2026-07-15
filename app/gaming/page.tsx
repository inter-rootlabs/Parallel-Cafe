import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getSectionHero, getTournaments } from '@/lib/sanity/queries';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Gaming Zone | Parallel Cafe',
  description: 'Level up your game at our PS5 gaming zone. Join tournaments and book hourly sessions.',
};

export const revalidate = 60; // ISR

export default async function GamingPage() {
  const [hero, tournaments] = await Promise.all([
    getSectionHero('gaming'),
    getTournaments(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-section-primary text-section-surface py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl mb-6 font-gaming uppercase text-[#7df9ff] drop-shadow-sm neon-glow animate-card-enter">
            {hero?.title || 'Level Up Your Game'}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-medium animate-card-enter stagger-1">
            {hero?.subtitle || 'PS5 gaming zone with tournaments, hourly bookings, and the best gaming experience in Bengaluru.'}
          </p>
        </Container>
      </section>

      {/* Info Section */}
      <section className="bg-[#111] py-16 text-white border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-card-enter">
              <h2 className="text-[#00aab7] font-gaming text-3xl">The Setup</h2>
              <p className="text-gray-400 text-lg">
                Immerse yourself in next-gen gaming. Whether you&apos;re playing solo, co-op with friends, or competing in our weekly tournaments.
              </p>
              <ul className="space-y-4">
                {[
                  'Latest PlayStation 5 Consoles',
                  '4K HDR Gaming Monitors',
                  'Ergonomic Gaming Chairs',
                  'Extensive Library (FIFA, CoD, Mortal Kombat, etc.)',
                  'Snacks and drinks delivered to your console'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#00aab7] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#00aab7]/20 mt-8">
                <h4 className="font-bold text-[#00aab7] mb-2 uppercase tracking-wider text-sm">Hourly Rates</h4>
                <p className="text-gray-300 text-lg">₹300 / hour per console (up to 2 players).</p>
                <p className="text-gray-500 text-sm mt-2">Walk-ins welcome, or call us to reserve a console.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-card-enter stagger-1">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
                  <Image src="/images/Ps5controller.jpg" alt="PS5 Controller" fill className="object-cover" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10">
                  <Image src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80" alt="Gaming Setup" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10">
                  <Image src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80" alt="Gaming Setup" fill className="object-cover" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
                  <Image src="/images/PS5L.jpg" alt="PS5" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tournaments Section */}
      <section className="bg-[#1a1a1a] py-20 min-h-[50vh]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-[#00aab7] font-gaming text-4xl mb-4 uppercase tracking-wider">Upcoming Tournaments</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Prove your skills, claim the prize pool, and earn bragging rights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.map((tour, i) => (
              <div key={tour.id} className="bg-[#222] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00aab7]/50 transition-colors animate-card-enter" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="h-48 relative bg-[#111]">
                  {tour.image ? (
                    <Image src={tour.image} alt={tour.title} fill className="object-cover opacity-70" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-gaming text-[#333] text-6xl opacity-30">VS</span>
                    </div>
                  )}
                  {tour.registrationOpen && (
                    <div className="absolute top-4 right-4 bg-[#00aab7] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Open
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-white text-2xl mb-4 font-bold">{tour.title}</h3>
                  <div className="space-y-3 mb-6">
                    <p className="flex justify-between text-sm border-b border-white/10 pb-2">
                      <span className="text-gray-400">Date</span>
                      <span className="text-white font-medium">{new Date(tour.date).toLocaleDateString()}</span>
                    </p>
                    <p className="flex justify-between text-sm border-b border-white/10 pb-2">
                      <span className="text-gray-400">Entry Fee</span>
                      <span className="text-[#00aab7] font-bold">₹{tour.entryFee}</span>
                    </p>
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-400">Prize Pool</span>
                      <span className="text-yellow-500 font-bold">{tour.prize}</span>
                    </p>
                  </div>
                  <Button
                    className="w-full bg-[#00aab7] hover:bg-[#008b96] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!tour.registrationOpen}
                  >
                    {tour.registrationOpen ? 'Register Now' : 'Registration Closed'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
