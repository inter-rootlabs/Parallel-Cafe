import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getSectionHero } from '@/lib/sanity/queries';
import Container from '@/components/ui/Container';
import BookingWidget from '@/components/booking/BookingWidget';

export const metadata: Metadata = {
  title: 'Private Screening | Parallel Cafe',
  description: 'Book our intimate screening rooms for movie nights, celebrations, and moments that matter.',
};

export const revalidate = 60; // ISR

export default async function ScreeningPage() {
  const hero = await getSectionHero('screening');

  return (
    <>
      {/* Hero Section */}
      <section className="bg-section-primary text-section-surface py-20 sm:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: 'url(/assets/images/roomtheatre.png)' }}
        />
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl mb-6 font-screening italic text-white drop-shadow-sm animate-card-enter">
            {hero?.title || 'Your Private Cinema Awaits'}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-medium animate-card-enter stagger-1">
            {hero?.subtitle || 'Intimate screening rooms for movie nights, celebrations, and moments that matter.'}
          </p>
        </Container>
      </section>

      {/* Booking Area */}
      <section className="bg-[#ebdfe4] py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Info Side */}
            <div className="space-y-8 animate-card-enter">
              <div>
                <h2 className="text-3xl sm:text-4xl text-[#9c6880] mb-4">Premium Viewing Experience</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Enjoy your favorite movies, sports events, or TV shows on a massive 4K screen with immersive Dolby Atmos surround sound. Perfect for dates, family gatherings, or hanging out with friends.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  '150-inch 4K Laser Projection',
                  'Dolby Atmos 7.1.2 Surround Sound',
                  'Plush Recliner Seating for up to 2 guests',
                  'Order food directly to your seat from our Cafe',
                  'Bring your own streaming accounts (Netflix, Prime, etc.)'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#b76e79] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="bg-white/60 p-6 rounded-2xl border border-[#b76e79]/20">
                <h4 className="font-bold text-[#9c6880] mb-2">Pricing</h4>
                <p className="text-gray-700 text-sm">₹300 for 1 hour (up to 2 guests). ₹150 per additional guest.</p>
              </div>
            </div>

            {/* Widget Side */}
            <div className="animate-card-enter stagger-1">
              <BookingWidget />
            </div>

          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-[#9c6880] mb-4">The Room</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Take a look inside our private screening room.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '/assets/images/THEATER.jpg',
              'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80'
            ].map((src, i) => (
              <div key={i} className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                <Image src={src} alt="Screening Room" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
