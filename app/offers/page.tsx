import React from 'react';
import type { Metadata } from 'next';
import { getOffers } from '@/lib/sanity/queries';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Offers & Deals | Parallel Cafe',
  description: 'Check out our latest flat offers, weekday specials, and celebration packages.',
};

export const revalidate = 60; // ISR

export default async function OffersPage() {
  const offersData = await getOffers();

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl text-[#2f3e36] mb-4">Offers & Deals</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Enjoy great value on your favorite food, drinks, and gaming sessions at Parallel Cafe.
          </p>
        </div>

        {/* Flat Offers */}
        {offersData.flatOffers && offersData.flatOffers.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl text-[#2f3e36] mb-8 flex items-center gap-4">
              Current Offers <div className="h-px bg-black/10 flex-1" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offersData.flatOffers.map((offer) => (
                <div key={offer.id || offer.title} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-black/5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#74bd58]/20 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div>
                    <Badge variant="outline" className="mb-4 border-[#74bd58] text-[#74bd58]">{offer.title.includes('%') ? 'Discount' : 'Flat Offer'}</Badge>
                    <h3 className="text-2xl text-[#2f3e36] mb-3">{offer.title}</h3>
                    <p className="text-gray-600 mb-6">{offer.description}</p>
                  </div>
                  {offer.condition && (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 text-sm text-gray-500 mt-auto">
                      <strong className="text-gray-700">T&C:</strong> {offer.condition}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekday Offers */}
        {offersData.weekdayOffers && offersData.weekdayOffers.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl text-[#2f3e36] mb-8 flex items-center gap-4">
              Weekday Specials <div className="h-px bg-black/10 flex-1" />
            </h2>
            <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                {offersData.weekdayOffers.map((offer) => (
                  <div key={offer.day} className="p-6 text-center hover:bg-gray-50 transition-colors flex flex-col">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{offer.day}</h4>
                    <p className="text-xl text-[#2f3e36] font-medium mb-4 flex-1">{offer.item}</p>
                    {offer.condition && (
                      <p className="text-xs text-gray-500 mt-auto">{offer.condition}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Celebration Package */}
        {offersData.celebrationPackage && (
          <div>
            <h2 className="text-2xl text-[#2f3e36] mb-8 flex items-center gap-4">
              Party & Celebrations <div className="h-px bg-black/10 flex-1" />
            </h2>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#b76e79]/20 flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-[#b76e79] p-8 sm:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-3xl sm:text-4xl mb-4 relative z-10">{offersData.celebrationPackage.title}</h3>
                <div className="flex items-baseline gap-3 mb-2 relative z-10">
                  <span className="text-3xl font-bold">₹{offersData.celebrationPackage.price}</span>
                  {offersData.celebrationPackage.originalPrice && (
                    <span className="text-lg line-through text-white/60">₹{offersData.celebrationPackage.originalPrice}</span>
                  )}
                </div>
                {offersData.celebrationPackage.idealFor && (
                  <p className="text-white/80 text-sm mt-4 relative z-10 bg-black/10 inline-block px-3 py-1.5 rounded-lg w-max">
                    Ideal for: {offersData.celebrationPackage.idealFor}
                  </p>
                )}
              </div>
              <div className="md:w-3/5 p-8 sm:p-12 bg-white flex flex-col justify-center">
                <h4 className="text-xl text-[#2f3e36] mb-6 font-medium">Package Inclusions:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  {offersData.celebrationPackage.inclusions?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b76e79] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-4">Advance booking required. Connect with our team to customize your package.</p>
                  <Button className="bg-[#2f3e36] hover:bg-[#1A1F1C] text-white">Inquire Now</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
